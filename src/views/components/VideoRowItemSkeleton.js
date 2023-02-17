import ImageShow from "../../modules/components/ImageShow"

function VideoRowItemSkeleton()
{
    return (
        <div className="video-row-item">
            <ImageShow className="video-row-item-img"/>
            <div className="video-row-item-title"><span> </span></div>
        </div>
    )
}

export default VideoRowItemSkeleton