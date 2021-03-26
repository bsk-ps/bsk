import { useState, useEffect } from "react";


const apiURL = "https://osego.me/bsk-api";


export default function useFetch(endpoint, formdata) {
    
    const [state, setState] = useState({ data: null, loading: true })

    useEffect(() => {
        setState({ data: null, loading: true })
        fetch(`${apiURL}/${endpoint}`, {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        })
            .then(res => res.json())
            .then(res => {
                setState({ data: res, loading: false })
            });
    }, [endpoint, formdata]);

    return state;
}