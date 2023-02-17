import NavbarItem from "../components/NavbarItem"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import ArchiveSvg from "../../media/svg/ArchiveSvg"
import HomeSvg from "../../media/svg/HomeSvg"
import urlConstant from "../../constant/urlConstant"
import GetCurrentLocation from "../../modules/hooks/GetCurrentLocation"
import ServicesSvg from "../../media/svg/ServicesSvg"

function Navbar()
{
    const {textConstant} = GetTextConstant()
    const {location} = GetCurrentLocation()
    const hide =
        location === urlConstant.profile ||
        location === urlConstant.account ||
        location === urlConstant.login ||
        location === urlConstant.about ||
        location === urlConstant.sendVideo

    return (
        <nav className={`navbar ${hide ? "hide" : ""}`}>
            {/*<div className="navbar-download">*/}
            {/*    <div>*/}
            {/*        <div>اپلیکیشن شبکه دانشگاه تهران</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="navbar-main">
                <NavbarItem title={textConstant.home} Icon={HomeSvg} link={urlConstant.home} location={location}/>
                <NavbarItem title={textConstant.archive} Icon={ArchiveSvg} link={urlConstant.archive} location={location}/>
                <NavbarItem title={textConstant.services} Icon={ServicesSvg} link={urlConstant.services} location={location}/>
            </div>
        </nav>
    )
}

export default Navbar