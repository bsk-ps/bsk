import "./Home.scss";

import { CaesarCipher, ColumnarTranspositionA, ColumnarTranspositionB, ColumnarTranspositionC, RailFence, VigeneresCipher } from '../components/ciphers'
import { LFSRGenerator } from "../components/LFSRGenerator";
import { StreamCipher } from "../components/StreamCipher";
import { DESCipher } from "../components/DESCipher";
export const Home = () => {
    return (
        <div className="home-content">
            <div>
                <div className="header">
                    <div className="title big">Bezpieczeństwo Sieci Komputerowych</div>
                    <div className="authors-block">
                        Adrian Oleszczak &bull; Bartosz Wiszowaty &bull; Szymon Sarosiek
                    </div>
                </div>
                <h1 className="display-1">Kryptografia</h1>
                <div style={{ height: "45px" }}></div>
                <DESCipher/>
                <div style={{ height: "25px" }}></div>
                <LFSRGenerator/>
                <div style={{ height: "45px" }}></div>
                <StreamCipher/>
                <div style={{ height: "45px" }}></div>
                <RailFence />
                <div style={{ height: "45px" }}></div>
                <ColumnarTranspositionA />
                <div style={{ height: "45px" }}></div>
                <ColumnarTranspositionB />
                <div style={{ height: "45px" }}></div>
                <ColumnarTranspositionC />
                <div style={{ height: "45px" }}></div>
                <CaesarCipher />
                <div style={{ height: "45px" }}></div>
                <VigeneresCipher />
                
            </div>
        </div>
    );
}