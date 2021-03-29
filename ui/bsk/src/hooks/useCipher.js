import { useState } from "react";
import { getBlobURL, getValidatedFormData, postRequest } from "../services/services";

export default function useCipher(form, endpoint) {
    const [output, setOutput] = useState('')

    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.input, form.key);
        if (formdata) {
            formdata.append("remove_whitespace", true);
            const response = await postRequest(formdata, `${endpoint}/cipher`)
            const body = await response.json()
            setOutput(body);
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.input, form.key);
        if (formdata) {
            const response = await postRequest(formdata, `${endpoint}/decipher`)
            const body = await response.json()
            setOutput(body);
        }
    }

    const handleEncodeWithFile = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.input, form.key);
        if (formdata) {
            formdata.append("remove_whitespace", true);
            const response = await postRequest(formdata, `${endpoint}/cipher`)
            const body = await response.blob()

            setOutput(getBlobURL(body));
        }
    }
    const handleDecodeWithFile = async () => {
        let formdata = getValidatedFormData("message_file", "ciphertext", "key", form.input, form.key);
        if (formdata) {
            const response = await postRequest(formdata, `${endpoint}/decipher`)
            const body = await response.blob()

            setOutput(getBlobURL(body));
        }
    }
    return [output, setOutput, handleEncode, handleDecode, handleEncodeWithFile, handleDecodeWithFile]
}