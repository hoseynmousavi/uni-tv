import CategoryHeader from "../containers/CategoryHeader"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import ImageShow from "../../seyed-modules/components/ImageShow"
import videoIcon from "../../media/images/video.svg"
import Material from "../../seyed-modules/components/Material"
import DownloadSvg from "../../media/svg/DownloadSvg"

function AboutPage()
{
    const {textConstant} = GetTextConstant()
    return (
        <div className="send-video">
            <CategoryHeader data={{title: textConstant.sendVideoTitle}}/>
            <div>
                <ImageShow className="send-video-img" src={videoIcon}/>
                <p className="send-video-desc">{textConstant.sendVideoDesc}</p>
            </div>
            <Material className="send-video-btn" disable>
                <DownloadSvg className="send-video-btn-icon"/>
                <div>{textConstant.sendVideoTitle}</div>
            </Material>
        </div>
    )
}

export default AboutPage