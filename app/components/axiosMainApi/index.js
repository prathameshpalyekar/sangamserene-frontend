import axios from 'axios';
import Config from '../../config.js'
import { shouldRedirectToLogin } from '../../modules/Auth/helpers/index.js';

const axiosMainApi = axios.create({
    baseURL: Config.MAIN_API_URL,
    withCredentials: true,
    responseType: 'json',
    // headers: {'Access-Control-Allow-Origin': '*'}
});

axiosMainApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status ===  401 && shouldRedirectToLogin()) {
        window.location = '/';
    }
    return Promise.reject(error);
});


export default axiosMainApi;
