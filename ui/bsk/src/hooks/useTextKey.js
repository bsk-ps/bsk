import { useState } from "react";

export default function useTextKey() {
    const [key, setKey] = useState('')

    const handleKeyChange = (event) => {
        let input = event.target.value;
        setKey(input)
    }

    return [key, handleKeyChange]
}