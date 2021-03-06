import { createRef, useRef, useState } from 'react';
import { ButtonGroup } from "./buttonGroup/ButtonGroup";


export const InputCardContainer = ({ onChange, textInput, setTextInput }) => {
    const fileInputRef = createRef()

    const [isFilePicked, setIsFilePicked] = useState(false);
    const [fileData, setFileData] = useState({});

    const handleFileChanged = (event) => {
        onChange(event.target.files[0]);
        setFileData(fileInputRef.current.files[0]);
        event.preventDefault();
        event.target.value = null;
        setIsFilePicked(true);
    };

    const handleTextChanged = (event) => {
        setIsFilePicked(false);
        onChange(event.target.value)
    }

    return (
        <InputCard
            value={textInput}
            isFilePicked={isFilePicked}
            fileRef={fileInputRef}
            onChange={handleTextChanged}
            onFileChanged={handleFileChanged}
            fileData={fileData}
        />)
}

const InputCard = ({ value, onChange, onFileChanged, isFilePicked, fileRef, fileData }) => {
    return (
        <div className="paper card">
            <h2 className="display-2">ENTER DATA</h2>
            <hr />
            <textarea value={value} onChange={onChange} placeholder="Enter text" className="text-input"></textarea>
            <hr />
            <h2 className="display-2">OR</h2>
            <input ref={fileRef} onChange={onFileChanged} type="file" name="file" className="btn-file" />
            {isFilePicked ? (
                <div>
                    <p>Filename: {fileData.name}</p>
                    <p>Filetype: {fileData.type}</p>
                    <p>Size in bytes: {fileData.size}</p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
        </div>
    );
}


const downloadToTxt = (output) => {
    if (output.length > 0) {
        const element = document.createElement("a");

        const file = new Blob([{ output }.output], { type: 'text/plain; charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "output.txt";
        document.body.appendChild(element);
        element.click();
    }
}

const OutputCard = ({ output }) => {

    return (
        <div className="paper card" style={{ whiteSpace: "pre-line" }}>
            <h2 className="display-2">OUTPUT</h2>
            <hr />
            <div id="scrollable" style={{ height: "200px", overflow: "auto", width: "100%", wordWrap: "break-word" }}>
                {output}
            </div>
            <hr />
            <h2 className="display-2">EXPORT</h2>
            <button onClick={downloadToTxt} className="btn-primary" >
                <span className="material-icons">
                    download
                </span>
            </button>
        </div>
    );
}


const PolynomialCard = ({ polynomial, onPolynomialInput }) => {
    return (
        <>
            <h1 className="display-2">
                {polynomial ?
                    polynomial.split(' ')
                        .map((val, index) =>
                            (<span key={index}>{index === 0 ? '' : '+'}x<sup>{val}</sup></span>)) : (<>POLYNOMIAL<sup></sup></>)
                }
            </h1>
            <hr />
            <div style={{
                marginBlockStart: '5px',
                marginBlockEnd: '10px',
            }}>
                <input value={polynomial} onChange={onPolynomialInput} className="key-input" placeholder="eg. 356" />
            </div>
        </>
    )
}


const BinaryCard = ({ value, binary, onBinaryInput }) => {
    const [check, setCheck] = useState(false)

    const handleCheckboxChange = event => {
        setCheck(event.target.checked)
    }

    return (
        <div className={`paper card ${check ? binary ? "card-ok" : "card-error" : ""}`}>
            <h1 className="display-2" style={check ? {} : { color: 'grey' }}>
                {binary
                    ? binary :
                    (<>
                        <input checked={check} onChange={handleCheckboxChange} className="checkbox-input" type="checkbox" />
                    INITIAL BINARY
                    </>)
                }
            </h1>
            <hr />
            <div style={{
                marginBlockStart: '5px',
                marginBlockEnd: '10px',
            }}>
                <input value={value} onChange={onBinaryInput} className="key-input" placeholder="eg. 6" disabled={!check} />
            </div>
        </div >
    )
}

const FileInputCard = ({ onChange }) => {
    const fileInputRef = createRef()

    const [isFilePicked, setIsFilePicked] = useState(false);
    const [fileData, setFileData] = useState({});

    const handleFileChanged = (event) => {
        onChange(event.target.files[0]);
        setFileData(fileInputRef.current.files[0]);
        event.preventDefault();
        event.target.value = null;
        setIsFilePicked(true);
    };
    return (
        <div className="paper card">
            <h2 className="display-2">CHOOSE FILE</h2>
            <hr />
            <div className="flex-center" style={{ height: "100%", flexDirection: "column" }}>
                <div className="flex-center">
                    <input ref={fileInputRef} onChange={handleFileChanged} type="file" name="file" className="btn-file" />
                </div>
                {isFilePicked ? (
                    <p>Filename: {fileData.name}</p>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </div>
        </div>
    )
}
const RunBlock = ({ onSwap, onEncode, onDecode, children }) => {

    return (
        <>
            <h2 className="display-2">RUN</h2>
            {children ? children :
                <ButtonGroup>
                    <button onClick={onEncode} className="btn-primary">Encode</button>
                    <button onClick={onSwap} className="btn-icon">
                        <span className="material-icons">
                            swap_horiz
                        </span>
                    </button>
                    <button onClick={onDecode} className="btn-primary">Decode</button>
                </ButtonGroup>
            }

        </>
    );
}


export { InputCard, OutputCard, RunBlock, PolynomialCard, BinaryCard, FileInputCard, downloadToTxt }