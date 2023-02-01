import ImageShow from "../../seyed-modules/components/ImageShow"
import {useContext} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import AccountSettingItem from "../components/AccountSettingItem"
import AboutSvg from "../../media/svg/AboutSvg"
import AccountToolsItem from "../components/AccountToolsItem"
import portal from "../../media/images/portal.png"
import food from "../../media/images/food.png"
import other from "../../media/images/other.png"
import login from "../../media/images/login.png"
import Button from "../../seyed-modules/components/Button"
import urlConstant from "../../constant/urlConstant"
import AccountLogout from "../components/AccountLogout"
import AccountLanguage from "../components/AccountLanguage"
import AccountDisplay from "../components/AccountDisplay"

function AccountPage()
{
    const {textConstant} = GetTextConstant()
    const {state: user} = useContext(AuthContext)
    const {avatar, name, email} = user || {}

    return (
        <div className="account">
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
                            <ImageShow className="account-detail-login-img" src={login}/>
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
                <AccountSettingItem link={null} Icon={AboutSvg} title={textConstant.aboutUs}/>
                <AccountLogout/>
            </div>
            <div className="account-tools">
                <div className="account-setting-title">{textConstant.tools}</div>
                <div className="account-tools-carts">
                    <AccountToolsItem title={textConstant.portal} img={portal} href={process.env.REACT_APP_PORTAL_LINK}/>
                    <AccountToolsItem title={textConstant.food} img={food} href={process.env.REACT_APP_FOOD_LINK}/>
                    <AccountToolsItem title={textConstant.other} img={other}/>
                </div>
            </div>
        </div>
    )
}

export default AccountPage