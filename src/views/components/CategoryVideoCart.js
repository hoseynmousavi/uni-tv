import ImageShow from "../../seyed-modules/components/ImageShow"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import getVideoTime from "../../helpers/getVideoTime"

function CategoryVideoCart({data: {mediumUrl, title, time_create, hits}})
{
    const {textConstant} = GetTextConstant()
    return (
        <div className="category-video-cart">
            <ImageShow className="category-video-cart-image" src={mediumUrl}/>
            <div className="category-video-cart-title">{title}</div>
            <div className="category-video-cart-detail">
                <div>{hits}{textConstant.views}</div>
                <div>
                    {getVideoTime({time: time_create})}
                </div>
            </div>
        </div>
    )
}

export default CategoryVideoCart