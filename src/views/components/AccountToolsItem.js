import ImageShow from "../../modules/components/ImageShow"
import Material from "../../modules/components/Material"
import Link from "../../modules/components/Link"

function AccountToolsItem({img, title, href})
{
    return (
        <Link className="services-items-cart" href={href}>
            <Material className="services-items-cart-content">
                <ImageShow className="services-items-cart-content-img" src={img}/>
                <div className="services-items-cart-content-title">{title}</div>
            </Material>
        </Link>
    )
}

export default AccountToolsItem