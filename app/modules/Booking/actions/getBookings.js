import axiosMainApi from 'components/axiosMainApi'

export function getBookings(checkIn, checkOut, onSuccess) {
    const { host } = window.location;
    const url = host === 'localhost:6001' ? 'http://localhost:5000/api/getBookings' : '/api/getBookings';

    axiosMainApi.request({
        url,
        method: 'GET',
        params: {
            checkIn,
            checkOut
        }
    }).then((xhrResponse) => {
        if (xhrResponse && xhrResponse.data) {
            const { data } = xhrResponse;
            onSuccess(data);
        }
    }).catch((error) => {
        console.log(error);
    });
}