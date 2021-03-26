import { CaesarCipher, ColumnarTranspositionC, VigeneresCipher } from "../components/ciphers"

export const CryptoPartTwo = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Zadania 2</div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "25px" }}></div>
                <ColumnarTranspositionC />
                <div style={{ height: "45px" }}></div>
                <CaesarCipher />
                <div style={{ height: "45px" }}></div>
                <VigeneresCipher />
            </div>
        </div>
    )
}