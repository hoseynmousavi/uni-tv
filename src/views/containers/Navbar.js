import NavbarItem from "../components/NavbarItem"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import ArchiveSvg from "../../media/svg/ArchiveSvg"
import ProfileSvg from "../../media/svg/ProfileSvg"
import HomeSvg from "../../media/svg/HomeSvg"
import urlConstant from "../../constant/urlConstant"
import GetCurrentLocation from "../../seyed-modules/hooks/GetCurrentLocation"

function Navbar()
{
    const {textConstant} = GetTextConstant()
    const {location} = GetCurrentLocation()
    const hide = !(location === urlConstant.home || location === urlConstant.archive || location === urlConstant.account)
    return (
        <nav className={`navbar ${hide ? "hide" : ""}`}>
            <NavbarItem title={textConstant.home} Icon={HomeSvg} link={urlConstant.home} location={location}/>
            <NavbarItem title={textConstant.archive} Icon={ArchiveSvg} link={urlConstant.archive} location={location}/>
            <NavbarItem title={textConstant.account} Icon={ProfileSvg} link={urlConstant.account} location={location}/>
        </nav>
    )
}

export default Navbar