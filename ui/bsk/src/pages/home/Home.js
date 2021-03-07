import { ButtonGroup } from "../../components/ButtonGroup";
import "./Home.scss";
import { useState } from 'react';
import { Counter } from "../../components/counter/Counter";
import { railfenceCipher, railfenceDecipher } from "../../services/ciphers";
import { InputCard, OutputCard } from "../../components/Card";

const ColumnarTransposition = () => {
    const [form, setForm] = useState({
        key: 1,
        data: "",
    });

    return (
        <>
            <h2 className="display-3">COLUMNAR TRANSPOSITION A</h2>
            <div className="container">
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">

                    <h2 className="display-2">KEYS</h2>
                    <hr />

                    <hr />
                    <ButtonGroup>
                        <button className="btn-primary">Encode</button>
                        <button className="btn-icon">
                            <span className="material-icons">
                                swap_horiz
                            </span>
                        </button>
                        <button className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <OutputCard/>
            </div>
        </>
    );
}


const RailFence = () => {
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
        let formdata = new FormData();
        if (form.data instanceof File) {
            formdata.append("message_file", form.data);
        } else {
            formdata.append("message", form.data);
        }
        formdata.append("key", form.key);

        setOutput(
            await railfenceCipher(formdata)
        );
    }
    const handleDecode = async () => {
        let formdata = new FormData();
        if (form.data instanceof File) {
            formdata.append("ciphertext_file", form.data);
        } else {
            formdata.append("ciphertext", form.data);
        }
        formdata.append("key", form.key);

        setOutput(
            await railfenceDecipher(formdata)
        );
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
            <div className="container" style={{maxHeight: "440px"}}>
                <InputCard form={form} setForm={setForm} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">ROWS</h2>
                    <hr />
                    <Counter count={form.key} onIncrement={onIncrement} onDecrement={onDecrement} />
                    <hr />
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

export const Home = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Bezpieczeństwo Sieci Komputerowych</div>
                    <div className="authors-block">
                        Adrian Oleszczak &bull; Bartosz Wiszowaty &bull; Szymon Sarosiek
                    </div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "25px" }}></div>
                <RailFence />
                <div style={{ height: "45px" }}></div>
                <ColumnarTransposition />
            </div>
        </div>
    );
}