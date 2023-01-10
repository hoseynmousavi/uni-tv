import NavbarItem from "../components/NavbarItem"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import ArchiveSvg from "../../media/svg/ArchiveSvg"
import ProfileSvg from "../../media/svg/ProfileSvg"
import HomeSvg from "../../media/svg/HomeSvg"

function Navbar()
{
    const {textConstant} = GetTextConstant()
    return (
        <nav className="navbar">
            <NavbarItem title={textConstant.home} Icon={HomeSvg} active/>
            <NavbarItem title={textConstant.archive} Icon={ArchiveSvg}/>
            <NavbarItem title={textConstant.profile} Icon={ProfileSvg}/>
        </nav>
    )
}

export default Navbar