import { useState } from "react";

export default function useBinary() {
    const [state, setState] = useState({ value: '', binary: '' })

    const handleKeyChange = (event) => {
        let input = event.target.value;
        let regex = /^([0-9\b])+$/
        if (input === '' || regex.test(input)) {
            setState({ value: input, binary: input ? dec2bin(input) : '' })
        }
    }
    return [state.value, state.binary, handleKeyChange]
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}