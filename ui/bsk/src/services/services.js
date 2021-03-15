const apiURL = "https://osego.me/bsk-api";

const railfenceCipher = async (formdata) => await postRequest(formdata, 'railfence/cipher');

const railfenceDecipher = async (formdata) => await postRequest(formdata, 'railfence/decipher');

const columnarTranspositionCipher = async (formdata) => await postRequest(formdata, 'columnar_transposition/cipher');

const columnarTranspositionDecipher = async (formdata) => await postRequest(formdata, 'columnar_transposition/decipher');

const rowOrderCipher = async (formdata) => await postRequest(formdata, 'row_order/cipher');

const rowOrderDecipher = async (formdata) => await postRequest(formdata, 'row_order/decipher');

const caesarCipher = async (formdata) => await postRequest(formdata, 'caesar/cipher');

const caesarDecipher = async (formdata) => await postRequest(formdata, 'caesar/decipher');

const vigenereCipher = async (formdata) => await postRequest(formdata, 'vigenere/cipher');

const vigenereDecipher = async (formdata) => await postRequest(formdata, 'vigenere/decipher');

const postRequest = async (formdata, endpoint) => {
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(`${apiURL}/${endpoint}`, requestOptions);

    const body = await response.json();
    if (response.status === 400) {
        return await body["detail"]
    }
    return await body;
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

export {
    railfenceCipher,
    railfenceDecipher,
    columnarTranspositionCipher,
    columnarTranspositionDecipher,
    getValidatedFormData,
    rowOrderCipher,
    rowOrderDecipher,
    caesarCipher,
    caesarDecipher,
    vigenereCipher,
    vigenereDecipher,
};


