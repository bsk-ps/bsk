import useCounter from "../hooks/useCounter";
import useStateWithValidation from "../hooks/useStateWithValidation";
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
    const [polymonial, handlePolynomialInput] = useStateWithValidation(/^[0-9\b]+$/)
    const [binary, handleBinaryInput] = useStateWithValidation(/^[0-1\b]+$/)

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
                        <PolynomialPreview value={polymonial} />
                        <hr />
                        <input value={polymonial} onChange={handlePolynomialInput} className="key-input" placeholder="eg. 356" />
                    </div>
                    <div className="paper card">
                        <h2 className="display-2">
                            {binary ? binary : 'INITIAL BINARY'}
                        </h2>
                        <hr />
                        <input value={binary} onChange={handleBinaryInput} className="key-input" placeholder="eg. 010011" />
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