import { LFSRGenerator } from "../components/LFSRGenerator"
import { StreamCipher } from "../components/StreamCipher"
export const CryptoPartThree = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Zadanie 3</div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "25px" }}></div>
                <LFSRGenerator />
                <div style={{ height: "25px" }}></div>
                <StreamCipher />
            </div>
        </div>
    )
}