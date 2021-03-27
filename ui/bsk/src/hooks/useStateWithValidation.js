import { useState } from "react";

export default function useStateWithValidation(regex) {
    const [state, setState] = useState('')

    const handleSetState = (event) => {
        if (event.target.value === '' || regex.test(event.target.value)) {
            setState(event.target.value)
        }
    }

    return [state, handleSetState]
}