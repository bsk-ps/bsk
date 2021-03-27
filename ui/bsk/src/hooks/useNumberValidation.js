import { useState } from "react";

export default function useNumberValidation() {
    const [state, setState] = useState('')

    const handleSetState = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setState(event.target.value)
        }
    }

    return [state, handleSetState]
}