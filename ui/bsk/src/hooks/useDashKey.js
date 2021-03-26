import { useState } from "react";

export default function useDashKey() {
    const [key, setKey] = useState('')

    const handleKeyChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\s/g, '-');
        setKey(input)
    }

    return [key, handleKeyChange]
}