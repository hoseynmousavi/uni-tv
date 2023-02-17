import CategoryHeader from "../containers/CategoryHeader"
import GetTextConstant from "../../modules/hooks/GetTextConstant"

function PrivacyPage()
{
    const {textConstant} = GetTextConstant()
    return (
        <div className="privacy">
            <CategoryHeader data={{title: textConstant.privacyTitle}}/>
            <p className="privacy-text">
                {
                    textConstant.privacyText
                }
            </p>
        </div>
    )
}

export default PrivacyPage