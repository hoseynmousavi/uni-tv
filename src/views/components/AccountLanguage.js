import AccountSettingItem from "./AccountSettingItem"
import LanguageSvg from "../../media/svg/LanguageSvg"
import toastManager from "../../seyed-modules/helpers/toastManager"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import {INFO_TOAST} from "../../seyed-modules/constant/toastTypes"

function AccountLanguage()
{
    const {textConstant, toastConstant} = GetTextConstant()

    function onClick()
    {
        toastManager.addToast({message: toastConstant.availableSoon, type: INFO_TOAST})
    }

    return (
        <AccountSettingItem onClick={onClick} Icon={LanguageSvg} title={textConstant.chooseLanguage}/>
    )
}

export default AccountLanguage