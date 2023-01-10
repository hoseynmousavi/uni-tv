import LogoSvg from "../../media/svg/LogoSvg"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import Button from "../../seyed-modules/components/Button"
import ScrollY from "../../seyed-modules/hooks/ScrollY"
import {useState} from "react"

function Header()
{
    const [isStick, setIsStick] = useState(false)
    const {textConstant} = GetTextConstant()
    ScrollY({condition})

    function condition({scrollTop})
    {
        setIsStick(scrollTop > 0)
    }

    return (
        <header className={`header ${isStick ? "is-stick" : ""}`}>
            <div className="header-section">
                <div className="header-logo">
                    <LogoSvg className="header-logo-icon"/>
                </div>
                <h1 className="header-title">{process.env.REACT_APP_NAME}</h1>
            </div>
            <Button className="header-btn">{textConstant.sendVideo}</Button>
        </header>
    )
}

export default Header