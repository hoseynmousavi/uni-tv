import CategoryHeader from "../containers/CategoryHeader"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import LogoTypeSvg from "../../media/svg/LogoTypeSvg"

function AboutPage()
{
    const {textConstant} = GetTextConstant()
    return (
        <div className="about">
            <CategoryHeader data={{title: textConstant.aboutUs}}/>
            <LogoTypeSvg className="about-logo"/>
            <p className="about-text">
                {textConstant.about}
            </p>
            <h2 className="about-title">{textConstant.aboutTitle}</h2>
            <p className="about-desc">
                {textConstant.aboutDesc}
            </p>
        </div>
    )
}

export default AboutPage