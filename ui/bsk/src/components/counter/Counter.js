import './Counter.scss';

export const Counter = ({ count, onIncrement, onDecrement }) => {

    const handleIncrement = () => {
        onIncrement()
    }
    const handleDecrement = () => {
        onDecrement()
    }

    return (
        <div>
            <div className="counter">
                <button onClick={handleDecrement} className="controll">
                    <span className="material-icons">
                        remove
                    </span>
                </button>
                <div className="count">{count}</div>
                <button onClick={handleIncrement} className="controll">
                    <span className="material-icons">
                        add
                    </span>
                </button>
            </div>
        </div>
    );
}