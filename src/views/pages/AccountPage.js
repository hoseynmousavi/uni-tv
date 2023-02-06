import ImageShow from "../../seyed-modules/components/ImageShow"
import {useContext} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import AccountSettingItem from "../components/AccountSettingItem"
import AboutSvg from "../../media/svg/AboutSvg"
import Button from "../../seyed-modules/components/Button"
import urlConstant from "../../constant/urlConstant"
import AccountLogout from "../components/AccountLogout"
import AccountLanguage from "../components/AccountLanguage"
import AccountDisplay from "../components/AccountDisplay"
import AccountSvg from "../../media/svg/AccountSvg"
import CategoryHeader from "../containers/CategoryHeader"
import DownloadSvg from "../../media/svg/DownloadSvg"

function AccountPage()
{
    const {textConstant} = GetTextConstant()
    const {state: user} = useContext(AuthContext)
    const {avatar, name, email} = user || {}

    return (
        <div className="account">
            <CategoryHeader data={{title: textConstant.profile}}/>
            <div className="account-detail">
                {
                    user ?
                        <>
                            <ImageShow className="account-detail-avatar" src={avatar}/>
                            <div className="account-detail-name">{name}</div>
                            <div className="account-detail-email">{email}</div>
                            <Link to={urlConstant.profile}>
                                <Material className="account-detail-edit" backgroundColor={createMaterialColor({variable: "--link-color"})}>
                                    {textConstant.editAccount}
                                </Material>
                            </Link>
                        </>
                        :
                        <>
                            <AccountSvg className="account-detail-login-img"/>
                            <Link className="account-detail-login-btn" to={urlConstant.login}>
                                <Button className="account-detail-login-btn-inner" type="second">{textConstant.loginRegister}</Button>
                            </Link>
                        </>
                }
            </div>
            <div className="account-setting">
                <div className="account-setting-title">{textConstant.setting}</div>
                <AccountDisplay/>
                <AccountLanguage/>
                <AccountSettingItem link={urlConstant.sendVideo} Icon={DownloadSvg} title={textConstant.sendVideo}/>
                <AccountSettingItem link={urlConstant.about} Icon={AboutSvg} title={textConstant.aboutUs}/>
                <AccountLogout/>
            </div>
            <div className="account-footer">
                <div className="account-footer-title">Version 1</div>
                <div className="account-footer-desc">Made with love in Iran</div>
            </div>
        </div>
    )
}

export default AccountPage