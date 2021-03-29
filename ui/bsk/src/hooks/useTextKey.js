import { useState } from "react";

export default function useTextKey(data='') {
    const [key, setKey] = useState(data)

    const handleKeyChange = (event) => {
        let input = event.target.value;
        setKey(input)
    }

    return [key, handleKeyChange]
}