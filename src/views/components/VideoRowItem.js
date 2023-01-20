import ImageShow from "../../seyed-modules/components/ImageShow"
import Material from "../../seyed-modules/components/Material"
import Link from "../../seyed-modules/components/Link"
import urlConstant from "../../constant/urlConstant"

function VideoRowItem({data: {id, mediumUrl, title}})
{
    return (
        <Link to={id && urlConstant.video(id)}>
            <Material className="video-row-item">
                <ImageShow className="video-row-item-img" src={mediumUrl}/>
                <div className="video-row-item-title">{title}</div>
            </Material>
        </Link>
    )
}

export default VideoRowItem