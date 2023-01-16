import LogoSvg from "../../media/svg/LogoSvg"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import Button from "../../seyed-modules/components/Button"
import ScrollY from "../../seyed-modules/hooks/ScrollY"
import {useState} from "react"

function HomeHeader()
{
    const [isStick, setIsStick] = useState(false)
    const {textConstant} = GetTextConstant()
    ScrollY({condition})

    function condition({scrollTop})
    {
        setIsStick(scrollTop > 0)
    }

    return (
        <header className={`home-header ${isStick ? "is-stick" : ""}`}>
            <div className="home-header-section">
                <div className="home-header-logo">
                    <LogoSvg className="home-header-logo-icon"/>
                </div>
                <h1 className="home-header-title">{process.env.REACT_APP_NAME}</h1>
            </div>
            <Button type="second" className="home-header-btn">{textConstant.sendVideo}</Button>
        </header>
    )
}

export default HomeHeader