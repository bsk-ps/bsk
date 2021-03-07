import { useState } from 'react';

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

const OutputCard = ({ output }) => {
    return (
        <div className="paper card" style={{ whiteSpace: "pre-line" }}>
            <h2 className="display-2">OUTPUT</h2>
            <hr />
            <div id="scrollable" style={{overflow: "auto", width: "100%"}}>
                {output}
            </div>
        </div>
    );
}
export { InputCard, OutputCard }