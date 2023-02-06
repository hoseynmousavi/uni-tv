import LogoTypeSvg from "../../media/svg/LogoTypeSvg"
import Material from "../../seyed-modules/components/Material"
import ProfileSvg from "../../media/svg/ProfileSvg"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function HomeHeader()
{
    return (
        <header className="home-header">
            <div className="home-header-section">
                <LogoTypeSvg className="home-header-title"/>
            </div>
            <Link to={urlConstant.account}>
                <Material className="home-header-profile">
                    <ProfileSvg className="home-header-profile-icon"/>
                </Material>
            </Link>
        </header>
    )
}

export default HomeHeader