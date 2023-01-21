import AccountSettingItem from "./AccountSettingItem"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import DisplaySvg from "../../media/svg/DisplaySvg"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {INFO_TOAST} from "../../seyed-modules/constant/toastTypes"

function AccountDisplay()
{
    const {textConstant, toastConstant} = GetTextConstant()
    const {isDark} = GetTheme()

    function themeToggle()
    {
        toastManager.addToast({message: toastConstant.availableSoon, type: INFO_TOAST})
        // if (!isChanging.current)
        // {
        //     isChanging.current = true
        //     changeBodyOverflow(true)
        //     document.body.style.transition = "all ease 300ms"
        //     document.getElementById("index-temp").style.transition = "all ease 300ms"
        //     contRef.current.style.transition = "all ease 300ms"
        //     contRef.current.classList = "account switch-anime"
        //     setTimeout(() =>
        //     {
        //         changeTheme({theme: isDark ? "light" : "dark", save: true})
        //         setTimeout(() =>
        //         {
        //             isChanging.current = false
        //             changeBodyOverflow(false)
        //             document.body.style.removeProperty("transition")
        //             document.getElementById("index-temp").style.removeProperty("transition")
        //             contRef.current.style.removeProperty("transition")
        //             contRef.current.classList = "account"
        //         }, 300)
        //     }, 400)
        // }
    }

    return (
        <AccountSettingItem onClick={themeToggle} Icon={DisplaySvg} title={textConstant.darkMode} haveSwitch switchOn={isDark}/>
    )
}

export default AccountDisplay