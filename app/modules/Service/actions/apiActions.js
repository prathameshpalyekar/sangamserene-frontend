import axiosMainApi from 'components/axiosMainApi'
import { updateServices } from './index.js';

export const fetchServices = () => {
    return (dispatch) => {
        return axiosMainApi.request({
            url: 'services',
            method: 'GET',
        }).then((xhrResponse) => {
            if (xhrResponse && xhrResponse.data) {
                dispatch(updateServices(xhrResponse.data.data || []));
            }
        }).catch((xhrResponse) => {
            const response = xhrResponse.data;
        });
    };
};

