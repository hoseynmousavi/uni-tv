import LogoTypeSvg from "../../media/svg/LogoTypeSvg"
import Material from "../../modules/components/Material"
import Link from "../../modules/components/Link"
import urlConstant from "../../constant/urlConstant"
import ProfileSvg from "../../media/svg/ProfileSvg"

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