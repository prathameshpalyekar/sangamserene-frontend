import axiosMainApi from 'components/axiosMainApi';

export const uploadPictureUri = (picture, successCallback, failureCallback) => {
    const data = new FormData();
    data.append('filename', picture);

    return axiosMainApi.request({
        url: `uploader`,
        method: 'post',
        data: data
    }).then((xhrResponse) => {
        if (xhrResponse && xhrResponse.data) {
            successCallback(xhrResponse.data);
        } else {
            failureCallback('No response received');
        }
    }).catch((error) => {
        failureCallback(error);
    });
}
