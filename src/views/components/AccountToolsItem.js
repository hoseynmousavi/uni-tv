import ImageShow from "../../seyed-modules/components/ImageShow"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"

function AccountToolsItem({img, title, href})
{
    return (
        <Link className="account-tools-cart" href={href}>
            <Material className="account-tools-cart-item">
                <ImageShow className="account-tools-cart-item-img" src={img}/>
                <div className="account-tools-cart-item-title">{title}</div>
            </Material>
        </Link>
    )
}

export default AccountToolsItem