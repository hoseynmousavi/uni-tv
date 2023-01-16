import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import Link from "../../seyed-modules/components/Link"

function NavbarItem({title, Icon, location, link})
{
    const active = link === location
    return (
        <Link to={link}>
            <Material className={`navbar-item ${active ? "active" : ""}`} backgroundColor={createMaterialColor({variable: "--third-color", alpha: "0.1"})}>
                <div className="navbar-item-icon">
                    <Icon className="navbar-item-icon-svg"/>
                </div>
                <div className="navbar-item-title">{title}</div>
            </Material>
        </Link>
    )
}

export default NavbarItem