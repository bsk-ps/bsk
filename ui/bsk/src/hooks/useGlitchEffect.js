import { useState } from "react"

export default function useGlitchEffect() {
    const [fireGlitch, setFireGlitch] = useState(false)
    const handleCopyButton = () => {
        setFireGlitch(true)
        setTimeout(() => {
            setFireGlitch(false)
        }, 1800)
    }
    return [fireGlitch, handleCopyButton]
}