import { BACKEND_URL } from '../appConfig/urlConstant';
import _ from 'lodash';


export const getImagePath = (imagePath) => {

    let returnImage = _.split(imagePath, '/opt/render/project/src/public');
    return `${BACKEND_URL}${returnImage[1]}`;
}

export const isUserLogin = () => {
    let token = localStorage.getItem("__t");
    return (token) ? true : false
}