import { ColumnarTranspositionA, ColumnarTranspositionB, RailFence } from "../components/ciphers";

export const CryptoPartOne = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Zadania 1</div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "25px" }}></div>
                <RailFence />
                <div style={{ height: "45px" }}></div>
                <ColumnarTranspositionA />
                <div style={{ height: "45px" }}></div>
                <ColumnarTranspositionB />
            </div>
        </div>
    );
}
