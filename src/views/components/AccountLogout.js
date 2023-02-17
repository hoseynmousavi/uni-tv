import AccountSettingItem from "./AccountSettingItem"
import LogoutSvg from "../../media/svg/LogoutSvg"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import logoutManager from "../../modules/helpers/logoutManager"
import {useContext} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"

function AccountLogout()
{
    const {textConstant} = GetTextConstant()
    const {state: user} = useContext(AuthContext)

    function logout()
    {
        logoutManager.logout()
    }

    if (user)
    {
        return (
            <AccountSettingItem onClick={logout} Icon={LogoutSvg} title={textConstant.logout} isLogout/>
        )
    }
}

export default AccountLogout