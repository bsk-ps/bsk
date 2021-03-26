import { useState } from "react";
import { getValidatedFormData, postRequest } from "../services/services";

export default function useCipher(form, endpoint) {
    const [output, setOutput] = useState('')

    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.input, form.key);
        if (formdata) {
            formdata.append("remove_whitespace", true);
            const response = await postRequest(formdata, `${endpoint}/cipher`)
            setOutput(response);
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.input, form.key);
        if (formdata) {
            const response = await postRequest(formdata, `${endpoint}/decipher`);
            setOutput(response);
        }
    }

    return [output, setOutput, handleEncode, handleDecode]
}