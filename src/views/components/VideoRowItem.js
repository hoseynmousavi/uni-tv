import ImageShow from "../../modules/components/ImageShow"
import Material from "../../modules/components/Material"
import Link from "../../modules/components/Link"
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