import { ButtonGroup } from "../../components/ButtonGroup";
import "./Home.scss";
import { useState } from 'react';
import { Counter } from "../../components/counter/Counter";



const RailFence = () => {
    const [form, setForm] = useState({
        rows: 0,
        data: null,
        decode: null,
    })
    const onIncrement = () => {
        setForm({
            rows: form.rows += 1,
            data: form.data,
            decode: form.decode,
        })
    }
    const onDecrement = () => {
        setForm({
            rows: form.rows > 0 ? form.rows -= 1 : 0,
            data: form.data,
            decode: form.decode,
        })
    }

    return (
        <>
            <h2 className="display-3">RAIL FENCE</h2>
            <div className="container">
                <div className="paper card">
                    <h2 className="display-2">ENTER DATA</h2>
                    <hr />
                    <textarea placeholder="Enter text" className="text-input"></textarea>
                    <hr />
                    <h2 className="display-2">OR</h2>
                    <button className="btn-outline">UPLOAD FILE</button>
                </div>
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">ROWS</h2>
                    <hr />
                    <Counter count={form.rows} onIncrement={onIncrement} onDecrement={onDecrement} />
                    <hr />
                    <ButtonGroup>
                        <button className="btn-primary">Encode</button>
                        <button className="btn-primary">Decode</button>
                    </ButtonGroup>
                </div>
                <div className="paper card">
                    <h2 className="display-2">OUTPUT</h2>
                    <hr />
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