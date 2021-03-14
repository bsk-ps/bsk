import { useState } from 'react';
import { getValidatedFormData } from '../services/services';
import { ButtonGroup } from "./buttonGroup/ButtonGroup";
import { Counter } from './counter/Counter';

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

const RunCardWithNumericKey = ({ form, setForm, output, setOutput, cipherCall, decipherCall }) => {

    const handleKeyChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\s/g, '-');
        setForm({
            key: input,
            data: form.data,
        })
    }

    return (
        <div style={{ margin: "0 25px" }} className="paper card">
            <h2 className="display-2">KEY</h2>
            <hr />
            <div style={{ height: "200px" }}>
                <input placeholder="Enter key" onChange={handleKeyChange} className="key-input" />
                <div className="preview code">
                    {form.key}
                </div>
            </div>
            <hr />
            <RunBlock 
                form={form}
                setForm={setForm}
                output={output}
                setOutput={setOutput}
                cipherCall={cipherCall}
                decipherCall={decipherCall}
            />
        </div>
    );
}

const RunCardWithTextKey = ({ form, setForm, output, setOutput, cipherCall, decipherCall }) => {

    const handleKeyChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\s/g, '-');
        setForm({
            key: input,
            data: form.data,
        })
    }


    return (
        <div style={{ margin: "0 25px" }} className="paper card">
            <h2 className="display-2">TEXT KEY</h2>
            <hr />
            <div style={{ height: "200px" }}>
                <input placeholder="Enter key" onChange={handleKeyChange} className="key-input" />
            </div>
            <hr />
            <RunBlock 
                form={form}
                setForm={setForm}
                output={output}
                setOutput={setOutput}
                cipherCall={cipherCall}
                decipherCall={decipherCall}
            />
        </div>
    );
}

const RunCardWithCounter = ({ form, setForm, output, setOutput, cipherCall, decipherCall }) => {

    const onIncrement = () => {
        setForm({
            key: form.key += 1,
            data: form.data,
        })
    }
    const onDecrement = () => {
        setForm({
            key: form.key > 1 ? form.key -= 1 : 1,
            data: form.data,
        })
    }

    return (
        <div style={{ margin: "0 25px" }} className="paper card">
            <h2 className="display-2">ROWS</h2>
            <hr />
            <Counter count={form.key} onIncrement={onIncrement} onDecrement={onDecrement} />
            <hr />
            <RunBlock 
                form={form}
                setForm={setForm}
                output={output}
                setOutput={setOutput}
                cipherCall={cipherCall}
                decipherCall={decipherCall}
            />
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

const RunBlock = ({ form, setForm, output, setOutput, cipherCall, decipherCall }) => {

    const handleEncode = async () => {
        let formdata = getValidatedFormData("message_file", "message", "key", form.data, form.key);
        formdata.append("remove_whitespace", true);
        if (formdata) {
            const response = await cipherCall(formdata)
            setOutput(response);
        }
    }
    const handleDecode = async () => {
        let formdata = getValidatedFormData("ciphertext_file", "ciphertext", "key", form.data, form.key);
        if (formdata) {
            const response = await decipherCall(formdata);
            setOutput(response);
        }
    }
    const handleSwap = async () => {
        if (output !== "" && !(form.data instanceof File)) {
            setOutput(form.data)
            setForm({
                key: form.key,
                data: output,
            })
        }
    }

    return (
        <>
            <h2 className="display-2">RUN</h2>
            <ButtonGroup>
                <button onClick={handleEncode} className="btn-primary">Encode</button>
                <button onClick={handleSwap} className="btn-icon">
                    <span className="material-icons">
                        swap_horiz
                </span>
                </button>
                <button onClick={handleDecode} className="btn-primary">Decode</button>
            </ButtonGroup>
        </>
    );
}
export { InputCard, OutputCard, RunCardWithNumericKey, RunCardWithTextKey, RunCardWithCounter }