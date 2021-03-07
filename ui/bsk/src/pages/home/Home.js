import { ButtonGroup } from "../../components/ButtonGroup";
import "./Home.scss";
import { useState } from 'react';
import { Counter } from "../../components/counter/Counter";
import { railfenceCipher, railfenceDecipher } from "../../services/ciphers";



const RailFence = () => {
    const [form, setForm] = useState({
        key: 1,
        data: null,
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

    const handleDataChanged = (event) => {
        setForm({
            key: form.key,
            data: event.target.value,
        })
    }

    const handleEncode = async () => {

        let formdata = new FormData();
        formdata.append("message", form.data);
        formdata.append("key", form.key);

        setOutput(
            await railfenceCipher(formdata)
        );
    }
    const handleDecode = async () => {
        let formdata = new FormData();
        formdata.append("ciphertext", form.data);
        formdata.append("key", form.key);

        setOutput(
            await railfenceDecipher(formdata)
        );
    }

    const handleSwap = async () => {
        if (output !== "") {
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
            <div className="container">
                <div className="paper card">
                    <h2 className="display-2">ENTER DATA</h2>
                    <hr />
                    <textarea value={form.data} onChange={handleDataChanged} placeholder="Enter text" className="text-input"></textarea>
                    <hr />
                    <h2 className="display-2">OR</h2>
                    <button className="btn-outline">UPLOAD FILE</button>
                </div>
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
                <div className="paper card">
                    <h2 className="display-2">OUTPUT</h2>
                    <hr />
                    {output}
                </div>
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
                <RailFence />
            </div>
        </div>
    );
}