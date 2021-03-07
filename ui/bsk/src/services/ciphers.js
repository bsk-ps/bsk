const apiURL = "http://80.209.239.154/bsk-api/";

const railfenceCipher = async (formdata) => {
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(`${apiURL}railfence/cipher`, requestOptions);
    return await response.json();
}
const railfenceDecipher = async (formdata) => {
    
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(`${apiURL}railfence/decipher`, requestOptions);
    return await response.json();
}
export { railfenceCipher, railfenceDecipher };


