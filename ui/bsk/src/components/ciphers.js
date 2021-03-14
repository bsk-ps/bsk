import { useState } from 'react';
import { railfenceCipher, railfenceDecipher, columnarTranspositionCipher, columnarTranspositionDecipher, getValidatedFormData, rowOrderCipher, rowOrderDecipher, caesarCipher, caesarDecipher } from "../services/services";
import { InputCard, OutputCard, RunCardWithCounter, RunCardWithNumericKey, RunCardWithTextKey } from "./Card";
import { ButtonGroup } from "./buttonGroup/ButtonGroup";

export const ColumnarTranspositionA = () => {
    const [form, setForm] = useState({
        key: "",
        data: "",
    });

    const [output, setOutput] = useState("");

    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION A</h2>
            <div className="container">
                <InputCard form={form} setForm={setForm} />
                <RunCardWithNumericKey
                    form={form}
                    setForm={setForm}
                    output={output}
                    setOutput={setOutput}
                    cipherCall={rowOrderCipher}
                    decipherCall={rowOrderDecipher}
                />
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

    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION B</h2>
            <div className="container" style={{ maxHeight: "550px", }}>
                <InputCard form={form} setForm={setForm} />
                <RunCardWithTextKey
                    form={form}
                    setForm={setForm}
                    output={output}
                    setOutput={setOutput}
                    cipherCall={columnarTranspositionCipher}
                    decipherCall={columnarTranspositionDecipher}
                />
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


    return (
        <>
            <h2 className="display-3">RAIL FENCE</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <InputCard form={form} setForm={setForm} />
                <RunCardWithCounter
                    form={form}
                    setForm={setForm}
                    output={output}
                    setOutput={setOutput}
                    cipherCall={railfenceCipher}
                    decipherCall={railfenceDecipher}
                />
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


    return (
        <>
            <h2 className="display-3">CAESAR'S CIPHER</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <InputCard form={form} setForm={setForm} />
                <RunCardWithCounter
                    form={form}
                    setForm={setForm}
                    output={output}
                    setOutput={setOutput}
                    cipherCall={caesarCipher}
                    decipherCall={caesarDecipher}
                />
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
