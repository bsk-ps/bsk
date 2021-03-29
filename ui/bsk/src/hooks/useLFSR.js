import { useState } from "react"
import { postRequest } from "../services/services";

export default function useLFSR() {
    const [output, setOutput] = useState('')

    const handleGenerate = async (polynomial, n, seed) => { 
        if(polynomial.length>0 && n>0){
            let formdata = new FormData();
            formdata.append('polynomial', polynomial)
            formdata.append('n', n)
            if(seed){
                formdata.append('seed', seed)
            }
            const response = await postRequest(formdata, "lfsr/generate")
            const body = await response.json()
            setOutput(body)
        }
    }

    return [output, handleGenerate]
}