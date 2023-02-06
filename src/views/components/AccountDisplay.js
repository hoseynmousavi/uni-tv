import AccountSettingItem from "./AccountSettingItem"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import DisplaySvg from "../../media/svg/DisplaySvg"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import {useEffect, useState} from "react"
import Modal from "./Modal"
import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import Material from "../../seyed-modules/components/Material"
import SystemSvg from "../../media/svg/SystemSvg"
import SunSvg from "../../media/svg/SunSvg"
import MoonSvg from "../../media/svg/MoonSvg"
import cookieHelper from "../../seyed-modules/helpers/cookieHelper"
import goBack from "../../seyed-modules/helpers/goBack"

function AccountDisplay()
{
    const [openModal, setOpenModal] = useState(false)
    const {textConstant} = GetTextConstant()
    const [selectedOption, setSelectedOption] = useState("default")
    const {changeTheme} = GetTheme()
    const index = selectedOption === "dark" ? 1 : selectedOption === "light" ? 2 : 3
    const bottom = `calc(32px + (${index - 1} * 64px) + 32px - 12px)`

    useEffect(() =>
    {
        const theme = cookieHelper.getItem("theme")
        if (theme === "dark") setSelectedOption("dark")
        else if (theme === "light") setSelectedOption("light")
        else setSelectedOption("default")
    }, [])

    function select(value)
    {
        return function ()
        {
            setSelectedOption(value)
            setTimeout(() =>
            {
                if (value === "dark") changeTheme({save: true, theme: "dark"})
                else if (value === "light") changeTheme({save: true, theme: "light"})
                else changeTheme({reset: true})
                setTimeout(goBack, 100)
            }, 400)
        }
    }

    function toggleModal()
    {
        setOpenModal(openModal => !openModal)
    }

    return (
        <>
            <AccountSettingItem onClick={toggleModal} Icon={DisplaySvg} title={textConstant.darkMode}/>
            {
                openModal &&
                <Modal className="account-theme-cont" contentClassName="account-theme" close={toggleModal}>
                    <div className="account-theme-title">{textConstant.displayApp}</div>
                    <CheckSvg className="account-theme-checked" style={{bottom}}/>
                    <Material className="account-theme-item" onClick={select("default")}>
                        <SystemSvg className="account-theme-item-icon"/>
                        <div>{textConstant.themeSystem}</div>
                    </Material>
                    <Material className="account-theme-item" onClick={select("light")}>
                        <SunSvg className="account-theme-item-icon"/>
                        <div>{textConstant.themeDay}</div>
                    </Material>
                    <Material className="account-theme-item" onClick={select("dark")}>
                        <MoonSvg className="account-theme-item-icon"/>
                        <div>{textConstant.themeNight}</div>
                    </Material>
                </Modal>
            }
        </>
    )
}

export default AccountDisplay