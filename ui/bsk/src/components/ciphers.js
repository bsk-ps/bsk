import { useState } from 'react';
import { InputCardContainer, OutputCard, RunBlock } from "./Card";
import useCipher from '../hooks/useCipher';
import { Counter } from './counter/Counter';
import { KeyInput } from './KeyInput';
import useDashKey from '../hooks/useDashKey';
import useTextKey from '../hooks/useTextKey';
import useCounter from '../hooks/useCounter';


export const CipherContainer = ({ name, keyName, endpoint, keyValue, children }) => {
    const [inputData, setInputData] = useState('');
    const [output, setOutput, encode, decode,] = useCipher({ input: inputData, key: keyValue }, endpoint)

    const handleSwap = () => {
        if (output !== "" && !(inputData instanceof File)) {
            setOutput(inputData)
            setInputData(output)
        }
    }

    return <Cipher
        name={name}
        output={output}
        keyName={keyName}
        children={children}
        onEncode={encode}
        onDecode={decode}
        onSwap={handleSwap}
        onChange={text => { setInputData(text); }}
        textInput={inputData}
        setTextInput={setInputData}
    />;
}

const Cipher = ({ name, keyName, output, onChange, onSwap, onDecode, onEncode, children, textInput, setTextInput }) => {
    return (
        <>
            <h2 className="display-3">{name}</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <InputCardContainer onChange={onChange} textInput={textInput}
                    setTextInput={setTextInput} />
                <div style={{ margin: "0 25px" }} className="paper card">
                    <h2 className="display-2">{keyName}</h2>
                    <hr />
                    <div style={{ height: "200px" }}>
                        {children}
                    </div>
                    <hr />
                    <RunBlock onSwap={onSwap} onEncode={onEncode} onDecode={onDecode} />
                </div>
                <OutputCard output={output} />
            </div>
        </>
    );
}


const RailFence = () => {
    const [count, increment, decrement] = useCounter()

    return (
        <CipherContainer name='Rail Fence' keyName='KEY' keyValue={count} endpoint='railfence'>
            <Counter onIncrement={increment} onDecrement={decrement} count={count} />
        </CipherContainer>
    )
}

const ColumnarTranspositionA = () => {
    const [key, handleKeyChange] = useDashKey()

    return (
        <CipherContainer name='Columnar Transposition A' keyName='KEY' keyValue={key} endpoint='row_order'>
            <KeyInput keyValue={key} onKeyChange={handleKeyChange} showPreview />
        </CipherContainer>
    )
}

const ColumnarTranspositionB = () => {
    const [key, handleKeyChange] = useDashKey()

    return (
        <CipherContainer name='Columnar Transposition B' keyName='TEXT KEY' keyValue={key} endpoint='columnar_transposition'>
            <KeyInput keyValue={key} onKeyChange={handleKeyChange} />
        </CipherContainer>
    )

}
const ColumnarTranspositionC = () => {
    const [key, handleKeyChange] = useTextKey()

    return (
        <CipherContainer name='Disrupted Transposition' keyName='TEXT KEY' keyValue={key} endpoint='disrupted_transposition'>
            <KeyInput keyValue={key} onKeyChange={handleKeyChange} />
        </CipherContainer>
    )
}
const CaesarCipher = () => {
    const [count, increment, decrement] = useCounter()

    return (
        <CipherContainer name="Caesar's Cipher" keyName='KEY' keyValue={count} endpoint='caesar'>
            <Counter onIncrement={increment} onDecrement={decrement} count={count} />
        </CipherContainer>
    )
}
const VigeneresCipher = () => {
    const [key, handleKeyChange] = useTextKey()

    return (
        <CipherContainer name='Vigenere' keyName='TEXT KEY' keyValue={key} endpoint='vigenere'>
            <KeyInput keyValue={key} onKeyChange={handleKeyChange} />
        </CipherContainer>
    )
}

export {
    RailFence,
    ColumnarTranspositionA,
    ColumnarTranspositionB,
    ColumnarTranspositionC,
    CaesarCipher,
    VigeneresCipher,
}
