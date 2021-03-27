import { useState } from "react";
import useCounter from "../hooks/useCounter";
import useNumberValidation from "../hooks/useNumberValidation";
import { RunBlock } from "./Card";
import { Counter } from "./counter/Counter";

const PolynomialPreview = ({ value }) => {

    return <h2 className="display-2">
        {value ?
            value.split('').map((val, index) => <>{index === 0 ? '' : '+'}x<sup>{val}</sup></>)
            : (<>POLYNOMIAL<sup></sup></>)
        }
    </h2>
}

export const LFSRGenerator = () => {
    const [count, increment, decrement] = useCounter()
    const [value, handlePolynomialInput] = useNumberValidation()

    return (
        <>
            <h2 className="display-3">LFSRGenerator</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div className="paper card">
                        <PolynomialPreview value={value} />
                        <hr />
                        <input value={value} onChange={handlePolynomialInput} className="key-input" placeholder="eg. 356" />
                    </div>
                    <div className="paper card">
                        <h2 className="display-2">INITIAL BITS</h2>
                        <hr />
                        <input className="key-input" placeholder="eg. 010011" />
                    </div>

                </div>
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">NO. INTERATIONS</h2>
                    <hr />
                    <div>
                        <Counter onIncrement={increment} onDecrement={decrement} count={count} />
                    </div>
                    <hr />
                    <RunBlock />
                </div>
                <div className="paper card">
                    <h2 className="display-2">OUTPUT</h2>
                    <hr />
                </div>
            </div>
        </>
    )
}