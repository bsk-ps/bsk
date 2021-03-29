import { useState } from "react";
import useBinary from "../hooks/useBinary";
import useCounter from "../hooks/useCounter";
import useLFSR from "../hooks/useLFSR";
import useStateWithValidation from "../hooks/useStateWithValidation";
import { BinaryCard, PolynomialCard, RunBlock } from "./Card";
import { Counter } from "./counter/Counter";



export const LFSRGenerator = () => {
    const [count, increment, decrement] = useCounter()
    const [polynomial, handlePolynomialInput] = useStateWithValidation(/^(\s*[0-9]+\s*)+$/);
    const [value, binary, handleBinaryInput] = useBinary();
    const [fireGlitch, setFireGlitch] = useState(false)
    const [output, handleGenerate] = useLFSR();


    const handleCopyButton = () => {
        navigator.clipboard.writeText(output)
        setFireGlitch(true)
        setTimeout(()=>{
            setFireGlitch(false)
        }, 1500)
    }
    return (
        <>
            <h2 className="display-3">LFSR Generator</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div className={`paper card ${polynomial ? "card-ok" : ""}`}>
                        <PolynomialCard polynomial={polynomial} onPolynomialInput={handlePolynomialInput} />
                    </div>
                    <BinaryCard value={value} binary={binary} onBinaryInput={handleBinaryInput} />
                </div>
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">NO. INTERATIONS</h2>
                    <hr />
                    <div>
                        <Counter onIncrement={increment} onDecrement={decrement} count={count} />
                    </div>
                    <hr />
                    <RunBlock>
                        <button onClick={() => handleGenerate(polynomial, count, value)} className="btn-primary">generate</button>
                    </RunBlock>
                </div>
                <div className="paper card">
                    <h2 className="display-2">OUTPUT</h2>
                    <hr />
                    <div className={fireGlitch ? 'glitch' : ''} data-text={output} style={{ color: 'black' }}>
                        {output}
                    </div>

                    <button className="copy-btn flex-center" onClick={handleCopyButton}>
                        <span className="material-icons">
                            content_copy
                    </span>
                    </button>

                </div>
            </div>
        </>
    )
}