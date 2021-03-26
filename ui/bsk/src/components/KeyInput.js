const KeyInput = ({ keyValue, onKeyChange, showPreview=false }) => {

    return (
        <>
            <input placeholder="Enter key" onChange={onKeyChange} className="key-input" />
            {showPreview ?
                <div className="preview code">
                    {keyValue}
                </div> : <></>
            }
        </>
    );
}
export { KeyInput }