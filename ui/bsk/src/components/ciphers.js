import { useState } from 'react';
import { Counter } from "./counter/Counter";
import { railfenceCipher, railfenceDecipher, columnarTranspositionCipher, columnarTranspositionDecipher, getValidatedFormData } from "../services/services";
import { InputCard, OutputCard, RunCardWithNumericKey } from "./Card";
import { ButtonGroup } from "./buttonGroup/ButtonGroup";

export const ColumnarTranspositionA = () => {
    const [form, setForm] = useState({
        key: "",
        data: "",
    });

    const [output, setOutput] = useState("");

    const handleKeyChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\s/g, '-');
        setForm({
            key: input,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);
        if (formdata) {
            const response = await columnarTranspositionCipher(formdata)
            setOutput(response);
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            const response = await columnarTranspositionDecipher(formdata);
            setOutput(response);

        }
    }
    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }
    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION A</h2>
            <div className="container">
                <InputCard form={form} setForm={setForm} />
                <RunCardWithNumericKey form={form} onEncode={handleEncode} onDecode={handleDecode} onSwap={handleSwap} onKeyChange={handleKeyChange} />
                <OutputCard output={output} />
            </div>
        </>
    );
}

export const ColumnarTranspositionB = () => {
    const [form, setForm] = useState({
        key: "",
        data: "",
    });

    const [output, setOutput] = useState("");

    const handleKeyChange = (event) => {
        setForm({
            key: event.target.value,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);
        formdata.append("remove_whitespace", true);
        if (formdata) {
            setOutput(
                await columnarTranspositionCipher(formdata)
            );
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            setOutput(
                await columnarTranspositionDecipher(formdata)
            );
        }
    }

    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }
    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION B</h2>
            <div className="container" style={{ maxHeight: "550px", }}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">TEXT KEY</h2>
                    <hr />
                    <div style={{ height: "200px" }}>
                        <input placeholder="Enter key" onChange={handleKeyChange} className="key-input" />
                    </div>
                    <hr />
                    <h2 className="display-2">RUN</h2>
                    <ButtonGroup>
                        <button onClick={handleEncode} className="btn-primary">Encode</button>
                        <button onClick={handleSwap} className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button onClick={handleDecode} className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}

export const RailFence = () => {
    const [form, setForm] = useState({
        key: 1,
        data: "",
    });
    const [output, setOutput] = useState("");

    const onIncrement = () => {
        setForm({
            key: form.key += 1,
            data: form.data,
        })
    }
    const onDecrement = () => {
        setForm({
            key: form.key > 1 ? form.key -= 1 : 1,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);

        if (formdata) {
            setOutput(
                await railfenceCipher(formdata)
            );
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            setOutput(
                await railfenceDecipher(formdata)
            );
        }
    }
    const getValidatedFormData = (fileKey, textKey, key) => {
        let formdata = new FormData();
        if (form.data instanceof File) {
            formdata.append(fileKey, form.data);
        } else {
            formdata.append(textKey, form.data);
        }
        formdata.append(key, form.key);
        return formdata;
    }
    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }
    return (
        <>
            <h2 className="display-3">RAIL FENCE</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">ROWS</h2>
                    <hr />
                    <Counter count={form.key} onIncrement={onIncrement} onDecrement={onDecrement} />
                    <hr />
                    <h2 className="display-2">RUN</h2>
                    <ButtonGroup>
                        <button onClick={handleEncode} className="btn-primary">Encode</button>
                        <button onClick={handleSwap} className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button onClick={handleDecode} className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}

export const CaesarCipher = () => {
    const [form, setForm] = useState({
        key: 1,
        data: "",
    });
    const [output, setOutput] = useState("");

    const onIncrement = () => {
        setForm({
            key: form.key += 1,
            data: form.data,
        })
    }
    const onDecrement = () => {
        setForm({
            key: form.key > 1 ? form.key -= 1 : 1,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);

        if (formdata) {
            setOutput(
                await railfenceCipher(formdata)
            );
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            setOutput(
                await railfenceDecipher(formdata)
            );
        }
    }
    const getValidatedFormData = (fileKey, textKey, key) => {
        let formdata = new FormData();
        if (form.data instanceof File) {
            formdata.append(fileKey, form.data);
        } else {
            formdata.append(textKey, form.data);
        }
        formdata.append(key, form.key);
        return formdata;
    }
    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }

    return (
        <>
            <h2 className="display-3">CAESAR'S CIPHER</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">KEY</h2>
                    <hr />
                    <Counter count={form.key} onIncrement={onIncrement} onDecrement={onDecrement} />
                    <hr />
                    <h2 className="display-2">RUN</h2>
                    <ButtonGroup>
                        <button onClick={handleEncode} className="btn-primary">Encode</button>
                        <button onClick={handleSwap} className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button onClick={handleDecode} className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}

export const VigeneresCipher = () => {
    const [form, setForm] = useState({
        key: "",
        data: "",
    });

    const [output, setOutput] = useState("");

    const handleKeyChange = (event) => {
        setForm({
            key: event.target.value,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);
        formdata.append("remove_whitespace", true);
        if (formdata) {
            setOutput(
                await columnarTranspositionCipher(formdata)
            );
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            setOutput(
                await columnarTranspositionDecipher(formdata)
            );
        }
    }

    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }
    return (
        <>
            <h2 className="display-3">VIGENERE'S CIPHER</h2>
            <div className="container" style={{ maxHeight: "550px", }}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">TEXT KEY</h2>
                    <hr />
                    <div style={{ height: "200px" }}>
                        <input placeholder="Enter key" onChange={handleKeyChange} className="key-input" />
                    </div>
                    <hr />
                    <h2 className="display-2">RUN</h2>
                    <ButtonGroup>
                        <button onClick={handleEncode} className="btn-primary">Encode</button>
                        <button onClick={handleSwap} className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button onClick={handleDecode} className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}

export const ColumnarTranspositionC = () => {
    const [form, setForm] = useState({
        key: "",
        data: "",
    });

    const [output, setOutput] = useState("");

    const handleKeyChange = (event) => {
        setForm({
            key: event.target.value,
            data: form.data,
        })
    }
    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);
        formdata.append("remove_whitespace", true);
        if (formdata) {
            setOutput(
                await columnarTranspositionCipher(formdata)
            );
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            setOutput(
                await columnarTranspositionDecipher(formdata)
            );
        }
    }

    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }
    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION C</h2>
            <div className="container" style={{ maxHeight: "550px", }}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">TEXT KEY</h2>
                    <hr />
                    <div style={{ height: "200px" }}>
                        <input placeholder="Enter key" onChange={handleKeyChange} className="key-input" />
                    </div>
                    <hr />
                    <h2 className="display-2">RUN</h2>
                    <ButtonGroup>
                        <button onClick={handleEncode} className="btn-primary">Encode</button>
                        <button onClick={handleSwap} className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button onClick={handleDecode} className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}
