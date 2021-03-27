import { createRef, useState } from 'react';
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


const OutputCard = ({ output }) => {
    const downloadToTxt = () => {
        if (output.length > 0) {
            const element = document.createElement("a");

            const file = new Blob([{ output }.output], { type: 'text/plain; charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = "output.txt";
            document.body.appendChild(element);
            element.click();
        }
    }
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



const RunBlock = ({ onSwap, onEncode, onDecode }) => {

    return (
        <>
            <h2 className="display-2">RUN</h2>
            <ButtonGroup>
                <button onClick={onEncode} className="btn-primary">Encode</button>
                <button onClick={onSwap} className="btn-icon">
                    <span className="material-icons">
                        swap_horiz
                </span>
                </button>
                <button onClick={onDecode} className="btn-primary">Decode</button>
            </ButtonGroup>
        </>
    );
}
export { InputCard, OutputCard, RunBlock }