const PolynomialComponent =({keyValue}) =>{
    const items = []
    const chars = keyValue.split('')
    for (const [index, value] of chars.entries()) {
        if(index+1 !== chars.length){
          items.push(<>x<sup>{value}</sup>+</>)
      }
      else if(index+1 === chars.length){
        items.push(<>x<sup>{value}</sup>+</>)
      }}
    
      return (
        <div >
          {items}
        </div>
      )
}
const KeyInput = ({ keyValue, onKeyChange, showPreview=false, showPolynomial = false }) => {

    return (
        <>
            <input placeholder="Enter key" onChange={onKeyChange} className="key-input" />
            {showPreview ?
                <div className="preview code">
                    {keyValue}
                </div> : <></>
            }
            {showPolynomial ?
              <div className="preview code">
               <PolynomialComponent keyValue={keyValue} />
            </div>: <></>
            }
        </>
    );
}
export { KeyInput }