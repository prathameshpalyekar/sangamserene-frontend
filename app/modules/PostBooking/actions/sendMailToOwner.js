import axiosMainApi from 'components/axiosMainApi'

export function sendMailToOwner(data, onSuccess) {
    // const { NODE_ENV } = process.env;
    const { host } = window.location;
    const url = host === 'localhost:6001' ? 'http://localhost:5000/api/sendMailToOwner' : '/api/sendMailToOwner';
    // console.log(NODE_ENV, 'NODE_ENV')
    axiosMainApi.request({
        url,
        method: 'POST',
        data
    }).then((xhrResponse) => {
        // if (xhrResponse && xhrResponse.data) {
        //     const { data } = xhrResponse;
        //     // onSuccess(data);
        // }
        console.log(xhrResponse)
    }).catch((error) => {
        console.log(error);
    });
}