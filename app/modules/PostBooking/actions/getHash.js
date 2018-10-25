import axiosMainApi from 'components/axiosMainApi'

export function getHash(data, onSuccess) {
    const { NODE_ENV } = process.env;
    console.log(NODE_ENV, 'NODE_ENV')
    axiosMainApi.request({
        url: 'http://localhost:5000/api/getHash',
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