import {useState, useEffect} from "react"

function IsMobile()
{
    const [isMobile, setIsMobile] = useState(window.innerWidth < 480)

    useEffect(() =>
    {
        function onResize()
        {
            setIsMobile(window.innerWidth < 480)
        }

        window.addEventListener("resize", onResize, {passive: true})
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return {isMobile}
}

export default IsMobile