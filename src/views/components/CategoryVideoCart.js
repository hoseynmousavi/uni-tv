import ImageShow from "../../seyed-modules/components/ImageShow"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import getVideoTime from "../../helpers/getVideoTime"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function CategoryVideoCart({data: {id, mediumUrl, title, time_create, hits}})
{
    const {textConstant} = GetTextConstant()
    return (
        <Link to={id && urlConstant.video(id)}>
            <Material className="category-video-cart">
                <ImageShow className="category-video-cart-image" src={mediumUrl}/>
                <div className="category-video-cart-title">{title}</div>
                <div className="category-video-cart-detail">
                    <div>{hits}{textConstant.views}</div>
                    <div>
                        {getVideoTime({time: time_create})}
                    </div>
                </div>
            </Material>
        </Link>
    )
}

export default CategoryVideoCart