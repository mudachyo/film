import {useEffect} from "react";

export const usePlayer = () => useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://yohoho.cc/yo.js"
    document.body.appendChild(script)
    return () => {
        document.body.removeChild(script)
    }
}, [])

