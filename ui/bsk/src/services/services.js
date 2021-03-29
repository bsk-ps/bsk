const apiURL = "https://osego.me/bsk-api";


const postRequest = async (formdata, endpoint) => {
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(`${apiURL}/${endpoint}`, requestOptions);

    if (response.status === 400) {
        const body = await response.json();
        return await body["detail"]
    }
    return response;
}



function getValidatedFormData(fileKey, textKey, key, formMessage, formKey) {
    if ((formMessage.length > 0 || formMessage instanceof File) && (formKey.length > 0 || formKey > 0)) {
        let formdata = new FormData();
        if (formMessage instanceof File) {
            formdata.append(fileKey, formMessage);
        } else {
            formdata.append(textKey, formMessage);
        }
        formdata.append(key, formKey);
        return formdata;
    }
    return null;
}

function getBlobURL(data) {
    if (data) {
        var url = URL.createObjectURL(data);
        return url;
    }
}
export {
    getValidatedFormData,
    postRequest,
    getBlobURL,
};
