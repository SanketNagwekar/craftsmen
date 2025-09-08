import axios from 'axios';
import _ from 'lodash';

export const customAxios = axios.create();

const requestHandler = async (request) => {
    let token = await localStorage.getItem("__t");
    request.headers.Authorization = `Bearer ${token}`;
    request.headers.uuid = (request.headers.uuid) ? request.headers.uuid : Math.floor(Math.random() * Math.floor(1000000000000));
    return request;
}

const getToken = async () => {
    let token = await localStorage.getItem("__t");
    return axios
        .post('/refreshToken', {}, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(op => {
            if (op && op.data && op.data.message && op.data.message === 'USER_TOKEN' && !_.isEmpty(op.data.result)) {
                localStorage.setItem("__t", op.data.result.token);
                return op.data.result.token;
            }
            else {
                localStorage.clear();
                window.location = '/';
            }
        })
        .catch(e => {
            localStorage.clear();
            window.location = '/';
            console.log("Exception:", e);
        });
}

const responseHandler = response => {
    return response;
}

const errorHandler = async (error) => {
    if (error && error.response && error.response.status === 400) {
        const originalReq = error.response.config;
        if (error && error.response && error.response.data && error.response.data.err_msg === "INVALID_TOKEN" && !originalReq._retry) {
            originalReq._retry = true;
            let newToken = await getToken();
            if (newToken) {
                return customAxios(originalReq);
            }
            else {
                return Promise.reject(error);
            }
        }
        else {
            return Promise.reject(error);
        }
    }
    else {
        return Promise.reject(error);
    }
}

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (request) => responseHandler(request),
    (error) => errorHandler(error)
);

export default customAxios;