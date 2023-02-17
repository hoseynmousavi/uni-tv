import {useLayoutEffect, useRef, useState} from "react"
import PlusSvg from "../media/svg/PlusSvg"
import Material from "./Material"
import CheckSvg from "../media/svg/CheckSvg"
import InfoSvg from "../media/svg/InfoSvg"
import CloseSvg from "../media/svg/CloseSvg"
import {FAIL_TOAST, INFO_TOAST, SUCCESS_TOAST, TIMER_TOAST} from "../constant/toastTypes"
import UndoSvg from "../media/svg/UndoSvg"
import MyTimer from "./MyTimer"
import pageLoaded from "../helpers/pageLoaded"

function Toast({item: {id, message, type, onClick, isUndo, removeOnChangeLocation}, clearMe})
{
    const timerInSecond = TIMER_TOAST
    const timerInMili = timerInSecond * 1000
    const [timerRemain, setTimerRemain] = useState(timerInMili)
    const toastRef = useRef(null)
    const toastMessageRef = useRef(null)
    const clearTimer = useRef(null)
    const timerInterval = useRef(null)
    const unMountTimer = useRef(null)

    useLayoutEffect(() =>
    {
        function show()
        {
            if (pageLoaded())
            {
                toastRef.current.style.transition = "height ease 0.1s, margin-bottom ease 0.1s, padding ease 0.1s, opacity ease 0.3s 0.1s"
                toastRef.current.style.height = toastMessageRef.current.scrollHeight + 32 + "px"
                toastRef.current.style.marginBottom = "15px"
                toastRef.current.style.padding = "16px 16px"
                toastRef.current.style.opacity = "1"

                if (isUndo)
                {
                    const start = new Date()
                    timerInterval.current = setInterval(() =>
                    {
                        const timerRemain = Math.max(0, Math.floor(timerInMili + (start - new Date())))
                        if (timerRemain === 0) clearItem()
                        else setTimerRemain(timerRemain)
                    }, 10)
                }
                else unMountTimer.current = setTimeout(clearItem, timerInMili)
            }
            else
            {
                window.addEventListener("load", show)
            }
        }

        show()

        return () =>
        {
            window.removeEventListener("load", show)
            clearInterval(timerInterval.current)
            clearTimeout(unMountTimer.current)
        }
        // eslint-disable-next-line
    }, [])

    useLayoutEffect(() =>
    {
        if (removeOnChangeLocation)
        {
            window.addEventListener("popstate", clearItem, {passive: true})
            window.addEventListener("pushstate", clearItem, {passive: true})
            window.addEventListener("replacestate", clearItem, {passive: true})

            return () =>
            {
                window.removeEventListener("popstate", clearItem)
                window.removeEventListener("pushstate", clearItem)
                window.removeEventListener("replacestate", clearItem)
            }
        }
        // eslint-disable-next-line
    }, [])

    function clearItem()
    {
        if (!clearTimer.current)
        {
            toastRef.current.style.transition = "height ease 0.1s 0.3s, margin-bottom ease 0.1s 0.3s, padding ease 0.1s 0.3s, opacity ease 0.3s"
            toastRef.current.style.height = "0"
            toastRef.current.style.marginBottom = "0"
            toastRef.current.style.padding = "0 16px"
            toastRef.current.style.opacity = "0"
            clearInterval(timerInterval.current)
            clearTimeout(unMountTimer.current)
            clearTimer.current = setTimeout(() => clearMe(id), 250)
        }
    }

    function onClickFunc()
    {
        onClick()
        clearItem()
    }

    return (
        <div className={`toast-item ${type}`} ref={toastRef} style={{height: "0", opacity: "0", marginBottom: "0", padding: "0 16px"}} onTouchEnd={!(isUndo || onClick) ? clearItem : null} onClick={onClick ? onClickFunc : clearItem}>
            <div className="toast-item-message" ref={toastMessageRef}>
                {
                    isUndo ?
                        <MyTimer percent={timerRemain / timerInMili * 100}
                                 text={Math.ceil(timerRemain / timerInMili * timerInSecond)}
                                 color={type === SUCCESS_TOAST ? "var(--toast-success-text)" : type === FAIL_TOAST ? "var(--toast-fail-text)" : "var(--toast-info-text)"}
                                 className="toast-item-svg"
                                 haveBg
                        />
                        :
                        type === SUCCESS_TOAST ?
                            <CheckSvg className="toast-item-svg success"/>
                            :
                            type === INFO_TOAST ?
                                <InfoSvg className="toast-item-svg info"/>
                                :
                                <CloseSvg className="toast-item-svg fail"/>
                }
                {message}
            </div>
            {
                isUndo ?
                    <Material className="toast-item-undo-btn">
                        <UndoSvg className="toast-item-close undo"/>
                        <div className="toast-item-undo-text">بازگرداندن</div>
                    </Material>
                    :
                    <Material className="toast-item-close-material" onClick={onClick ? clearItem : undefined}>
                        <PlusSvg className="toast-item-close"/>
                    </Material>
            }
        </div>
    )
}

export default Toast