import './ButtonGroup.css';


export const ButtonGroup = ({ children }) => {
    return (
        <div className="btn-group">
            {children}
        </div>
    );
}