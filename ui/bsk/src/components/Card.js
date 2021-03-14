import { useState } from 'react';
import { ButtonGroup } from "./buttonGroup/ButtonGroup";

const InputCard = ({ form, setForm }) => {

    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setForm({
            key: form.key,
            data: event.target.files[0],
        });
        event.target.value = null;
        setIsFilePicked(true);
    };

    const handleDataChanged = (event) => {
        setIsFilePicked(false);
        setForm({
            key: form.key,
            data: event.target.value,
        })
    }

    return (
        <div className="paper card">
            <h2 className="display-2">ENTER DATA</h2>
            <hr />
            <textarea value={form.data instanceof File ? "" : form.data} onChange={handleDataChanged} placeholder="Enter text" className="text-input"></textarea>
            <hr />
            <h2 className="display-2">OR</h2>
            <input onChange={changeHandler} type="file" name="file" className="btn-file" />
            {isFilePicked ? (
                <div>
                    <p>Filename: {form.data.name}</p>
                    <p>Filetype: {form.data.type}</p>
                    <p>Size in bytes: {form.data.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {form.data.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
        </div>
    );
}

const RunCardWithNumericKey = ({form, onKeyChange, onEncode, onSwap, onDecode}) => {
    return (
        <div style={{ margin: "0 25px" }} className="paper card">
            <h2 className="display-2">KEY</h2>
            <hr />
            <div style={{ height: "200px" }}>
                <input placeholder="Enter key" onChange={onKeyChange} className="key-input" />
                <div className="preview code">
                    {form.key}
                </div>
            </div>
            <hr />
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
export { InputCard, OutputCard, RunCardWithNumericKey }