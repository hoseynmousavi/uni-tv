import LogoSvg from "../../media/svg/LogoSvg"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import Button from "../../seyed-modules/components/Button"
import ScrollY from "../../seyed-modules/hooks/ScrollY"
import {useState} from "react"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {INFO_TOAST} from "../../seyed-modules/constant/toastTypes"

function HomeHeader()
{
    const [isStick, setIsStick] = useState(false)
    const {textConstant, toastConstant} = GetTextConstant()
    ScrollY({condition})

    function condition({scrollTop})
    {
        setIsStick(scrollTop > 0)
    }

    function onDisableClick()
    {
        toastManager.addToast({message: toastConstant.availableSoon, type: INFO_TOAST})
    }

    return (
        <header className={`home-header ${isStick ? "is-stick" : ""}`}>
            <div className="home-header-section">
                <div className="home-header-logo">
                    <LogoSvg className="home-header-logo-icon"/>
                </div>
                <h1 className="home-header-title">{process.env.REACT_APP_NAME}</h1>
            </div>
            <Button type="disable" className="home-header-btn" disable onDisableClick={onDisableClick}>{textConstant.sendVideo}</Button>
        </header>
    )
}

export default HomeHeader