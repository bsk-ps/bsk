//import { DESCipher} from "../components/ciphers"
import {DESCipher} from "../components/DESCipher"

export const CryptoPartFour = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Zadanie 4</div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "25px" }}></div>
                <DESCipher />
                <div style={{ height: "25px" }}></div>
                
            </div>
        </div>
    )
}