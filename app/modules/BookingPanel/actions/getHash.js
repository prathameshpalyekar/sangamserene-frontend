import axiosMainApi from 'components/axiosMainApi'

export function getHash(data, onSuccess) {
    const { host } = window.location;
    const url = host === 'localhost:6001' ? 'http://localhost:5000/api/getHash' : '/api/getHash';

    axiosMainApi.request({
        url,
        method: 'POST',
        data
    }).then((xhrResponse) => {
        if (xhrResponse && xhrResponse.data) {
            const { data } = xhrResponse;
            onSuccess(data);
        }
    }).catch((error) => {
        console.log(error);
    });
}