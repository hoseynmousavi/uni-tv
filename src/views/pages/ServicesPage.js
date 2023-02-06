import HomeHeader from "../containers/HomeHeader"
import AccountToolsItem from "../components/AccountToolsItem"
import portal from "../../media/images/portal.png"
import food from "../../media/images/food.png"
import other from "../../media/images/other.png"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"

function ServicesPage()
{
    const {textConstant} = GetTextConstant()

    return (
        <>
            <HomeHeader/>
            <div className="services">
                <div className="services-items">
                    <AccountToolsItem title={textConstant.portal} img={portal} href={process.env.REACT_APP_PORTAL_LINK}/>
                    <AccountToolsItem title={textConstant.food} img={food} href={process.env.REACT_APP_FOOD_LINK}/>
                    <AccountToolsItem title={textConstant.other} img={other}/>
                </div>
            </div>
        </>
    )
}

export default ServicesPage