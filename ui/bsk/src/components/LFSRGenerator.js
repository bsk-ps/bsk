import useCounter from "../hooks/useCounter";
import usePolynomialKey from "../hooks/usePolynomialKey"
import { RunBlock } from "./Card";
import { Counter } from "./counter/Counter";


export const LFSRGenerator = () => {
    const [count, increment, decrement] = useCounter()

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
                        <h2 className="display-2">POLYNOMIAL</h2>
                        <hr />
                        <input className="key-input" placeholder="eg. 356"/>
                    </div>
                    <div className="paper card">
                        <h2 className="display-2">INITIAL BITS</h2>
                        <hr />
                        <input className="key-input" placeholder="eg. 010011"/>
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