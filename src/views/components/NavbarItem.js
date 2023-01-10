import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function NavbarItem({title, Icon, active})
{
    return (
        <Material className={`navbar-item ${active ? "active" : ""}`} backgroundColor={createMaterialColor({variable: "--first-color", alpha: "0.1"})}>
            <div className="navbar-item-icon">
                <Icon className="navbar-item-icon-svg"/>
            </div>
            <div className="navbar-item-title">{title}</div>
        </Material>
    )
}

export default NavbarItem