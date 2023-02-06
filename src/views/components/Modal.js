import {useEffect} from "react"
import popOnPopState from "../../seyed-modules/helpers/popOnPopState"
import IsMobile from "../../hooks/IsMobile"
import MobileModal from "./MobileModal"
import DesktopModal from "./DesktopModal"

function Modal({className = "", contentClassName = "", children, close, statusBarColor, dontPush, dontChangeOverflow, updateHeightTimer})
{
    const {isMobile} = IsMobile()

    useEffect(() =>
    {
        popOnPopState({
            dontPush,
            dontChangeOverflow,
            statusBarColor,
        })
        // eslint-disable-next-line
    }, [])


    if (isMobile)
    {
        return (
            <MobileModal className={className} close={close} contentClassName={contentClassName} updateHeightTimer={updateHeightTimer}>
                {children}
            </MobileModal>
        )
    }
    else
    {
        return (
            <DesktopModal className={className} close={close}>
                {children}
            </DesktopModal>
        )
    }
}

export default Modal