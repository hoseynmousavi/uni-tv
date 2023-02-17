import Material from "../../modules/components/Material"
import createMaterialColor from "../../modules/helpers/createMaterialColor"
import Link from "../../modules/components/Link"

function NavbarItem({title, Icon, location, link})
{
    const active = link === location
    return (
        <Link to={link} replace>
            <Material className={`navbar-item ${active ? "active" : ""}`} backgroundColor={createMaterialColor({variable: "--second-color", alpha: "0.1"})}>
                <div className="navbar-item-icon">
                    <Icon className="navbar-item-icon-svg"/>
                </div>
                <div className="navbar-item-title">{title}</div>
            </Material>
        </Link>
    )
}

export default NavbarItem