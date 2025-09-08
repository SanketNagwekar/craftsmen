import { API_URL } from '../appConfig/urlConst';
import _ from 'lodash';


export const getImagePath = (imagePath) => {

    let returnImage = _.split(imagePath, '/opt/render/project/src/public');
    return `${API_URL}${returnImage[1]}`;
}

export const isUserLogin = () => {
    let token = localStorage.getItem("__t");
    return (token) ? true : false
}