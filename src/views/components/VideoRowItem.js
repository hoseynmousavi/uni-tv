import ImageShow from "../../seyed-modules/components/ImageShow"

function VideoRowItem({data: {mediumUrl, title}})
{
    return (
        <div className="video-row-item">
            <ImageShow className="video-row-item-img" src={mediumUrl}/>
            <div className="video-row-item-title">{title}</div>
        </div>
    )
}

export default VideoRowItem