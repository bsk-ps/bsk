import useCounter from "../hooks/useCounter";
import useStateWithValidation from "../hooks/useStateWithValidation";
import { BinaryCard, PolynomialCard, RunBlock } from "./Card";
import { Counter } from "./counter/Counter";



export const LFSRGenerator = () => {
    const [count, increment, decrement] = useCounter()
    const [polynomial, handlePolynomialInput] = useStateWithValidation(/^[0-9\b]+$/)
    const [binary, handleBinaryInput] = useStateWithValidation(/^[0-1\b]+$/)

    return (
        <>
            <h2 className="display-3">LFSR Generator</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div className="paper card">
                        <PolynomialCard polynomial={polynomial} onPolynomialInput={handlePolynomialInput} />
                    </div>
                    <div className="paper card">
                        <BinaryCard binary={binary} onBinaryInput={handleBinaryInput} />
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