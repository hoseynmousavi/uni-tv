import Material from "../../modules/components/Material"
import Link from "../../modules/components/Link"
import ArrowSvg from "../../media/svg/ArrowSvg"

function AccountSettingItem({onClick, link, Icon, title, isLogout})
{
    return (
        <Link to={link} onClick={onClick}>
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