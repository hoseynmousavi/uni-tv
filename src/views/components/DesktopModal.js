import {createPortal} from "react-dom"
import goBack from "../../modules/helpers/goBack"
import {useEffect, useState} from "react"
import popOnPopState from "../../modules/helpers/popOnPopState"

function DesktopModal({children, className, close})
{
    const [hide, setIsHide] = useState(false)

    useEffect(() =>
    {
        const cleanup = popOnPopState({
            callback: closeModal,
            dontPush: true,
            dontChangeOverflow: true,
        })

        return () => cleanup()
        // eslint-disable-next-line
    }, [])

    function closeModal()
    {
        setIsHide(true)
        setTimeout(close, 350)
    }

    function goBackIfNotHiding()
    {
        if (!hide) goBack()
    }

    return (
        createPortal(
            <>
                <div className={`modal-background ${hide ? "hide" : ""}`} onClick={goBackIfNotHiding}/>
                <div className={`modal ${className} ${hide ? "hide" : ""}`}>
                    {children}
                </div>
            </>
            ,
            document.getElementById("root"),
        )
    )
}

export default DesktopModal