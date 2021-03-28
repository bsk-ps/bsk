import useStateWithValidation from "../hooks/useStateWithValidation"
import { FileInputCard, PolynomialCard, RunBlock } from "./Card"

const Output = ({ output }) => {
    return (
        <div className="paper card">
            <h2 className="display-2">OUTPUT</h2>
            <hr />
            <div className="flex-center" style={{ height: "100%", flexDirection: "column" }}>
                <div className="flex-center">
                    <button className="btn-primary" >
                        download
                </button>
                </div>
                <p>output.txt</p>
            </div>
        </div>
    )
}
export const StreamCipher = () => {
    const [polynomial, handlePolynomialInput] = useStateWithValidation(/^[0-9\b]+$/)

    return (
        <>
            <h2 className="display-3">Stream Cipher</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <FileInputCard />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <PolynomialCard polynomial={polynomial} onPolynomialInput={handlePolynomialInput} />
                    <hr />
                    <RunBlock />
                </div>
                <Output output={''}/>
            </div>
        </>
    )
}