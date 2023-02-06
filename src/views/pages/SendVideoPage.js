import CategoryHeader from "../containers/CategoryHeader"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import ImageShow from "../../seyed-modules/components/ImageShow"
import videoIcon from "../../media/images/video.svg"
import Material from "../../seyed-modules/components/Material"
import DownloadSvg from "../../media/svg/DownloadSvg"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {INFO_TOAST} from "../../seyed-modules/constant/toastTypes"

function AboutPage()
{
    const {textConstant, toastConstant} = GetTextConstant()

    function onDisableClick()
    {
        toastManager.addToast({type: INFO_TOAST, message: toastConstant.availableSoon})
    }

    return (
        <div className="send-video">
            <CategoryHeader data={{title: textConstant.sendVideoTitle}}/>
            <div>
                <ImageShow className="send-video-img" src={videoIcon}/>
                <p className="send-video-desc">{textConstant.sendVideoDesc}</p>
            </div>
            <Material className="send-video-btn" disable onDisableClick={onDisableClick}>
                <DownloadSvg className="send-video-btn-icon"/>
                <div>{textConstant.sendVideoTitle}</div>
            </Material>
        </div>
    )
}

export default AboutPage