import useStateWithValidation from "../hooks/useStateWithValidation"
import { FileInputCard, RunBlock } from "./Card"
import { KeyInput } from './KeyInput';
import useTextKey from '../hooks/useTextKey'
import { useState } from "react"
import useCipher from "../hooks/useCipher"
import useGlitchEffect from "../hooks/useGlitchEffect"
const handleDownload = (url, filename) => {
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', `${filename}`);
    tempLink.click();
}
const Output = ({ output, glitch }) => {
    const [filename, changeFilename] = useTextKey('output.txt')

    return (
        <div className="paper card">
            <h2 className="display-2">
                {output ? <input data-text={filename} className={`simple-input display-2 ${glitch ? 'glitch' : ''}`} style={{ color: 'black' }} value={filename} onChange={changeFilename} /> : 'OUTPUT'}
            </h2>
            <hr />

            <div className="flex-center" style={{ height: "100%", flexDirection: "column" }}>
                <div className="flex-center">
                    <button onClick={() => handleDownload(output, filename)} className="btn-primary" >
                        download
                    </button>
                </div>
                <p>{output ? 'Success' : 'No data'}</p>
            </div>
        </div>
    )
}
export const DESCipher = () => {
   const [key, handleKeyChange] = useTextKey('')
   const [file, setFile] = useState(null)
   const [output, setOutput, , , handleEncodeWithFile, handleDecodeWithFile] = useCipher({ input: file, key: key }, 'des')
   const [glitch, handleGlitch] = useGlitchEffect()


    return (
        <>
            <h2 className="display-3">DES Cipher</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
            <FileInputCard onChange={file => { setFile(file); }} />
                <div style={{ margin: "0 25px" }} className="paper card">
                <h2 className="display-2">TEXT KEY</h2>
                    <hr />
                    <div style={{ height: "50px" }}>
                    <KeyInput keyValue={key} onKeyChange={handleKeyChange} />
                    </div>
                    <hr />
                    <RunBlock onEncode={() => {
                        handleEncodeWithFile();
                        handleGlitch();
                    }}
                    onDecode={() => {
                        handleDecodeWithFile();
                        handleGlitch();
                    }} />
                </div>
                <Output output={output} glitch={glitch} />
            </div>
        </>
    )
}