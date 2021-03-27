import usePolynomialKey from "../hooks/usePolynomialKey"

export const LFSRGenerator = () => {
    const [key, handleKeyChange] = usePolynomialKey()
    return (
        <>
            <h2 className="display-3">LFSRGenerator</h2>
            <div className="container" style={{ maxHeight: "550px" }}>
                <div className="paper card">
                    <h2 className="display-2">ENTER DATA</h2>
                    <hr />

                </div>
                <div className="paper card">
                    <h2 className="display-2">ENTER DATA</h2>
                    <hr />

                </div>
                <div className="paper card">
                    <h2 className="display-2">ENTER DATA</h2>
                    <hr />

                </div>
                <div className="paper card">
                    <h2 className="display-2">OUTPUT</h2>
                    <hr />

                </div>
            </div>
        </>
    )
}