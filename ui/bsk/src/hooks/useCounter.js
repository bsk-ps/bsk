import { useState } from "react";

export default function useCounter() {
    const [count, setCount] = useState(1)

    const increment = () => {
        setCount(current => current += 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(current => current -= 1)
        }

    }

    return [count, increment, decrement];
}