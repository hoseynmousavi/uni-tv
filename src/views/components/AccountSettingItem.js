import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import ArrowSvg from "../../media/svg/ArrowSvg"

function AccountSettingItem({link, Icon, title, isLogout})
{
    return (
        <Link to={link}>
            <Material className="account-setting-item">
                <div className="account-setting-item-content">
                    <div className={`account-setting-item-content-icon ${isLogout ? "logout" : ""}`}>
                        <Icon className="account-setting-item-content-icon-svg"/>
                    </div>
                    {title}
                </div>
                <ArrowSvg className="account-setting-item-arrow"/>
            </Material>
        </Link>
    )
}

export default AccountSettingItem