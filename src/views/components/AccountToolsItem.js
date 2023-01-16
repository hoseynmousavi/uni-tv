import ImageShow from "../../seyed-modules/components/ImageShow"
import Material from "../../seyed-modules/components/Material"

function AccountToolsItem({img, title})
{
    return (
        <Material className="account-tools-cart-item">
            <ImageShow className="account-tools-cart-item-img" src={img}/>
            <div className="account-tools-cart-item-title">{title}</div>
        </Material>
    )
}

export default AccountToolsItem