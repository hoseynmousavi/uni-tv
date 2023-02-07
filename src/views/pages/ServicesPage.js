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
                    <AccountToolsItem title={textConstant.service1} img={portal} href={process.env.REACT_APP_SERVICE1_LINK}/>
                    <AccountToolsItem title={textConstant.service2} img={food} href={process.env.REACT_APP_SERVICE2_LINK}/>
                    <AccountToolsItem title={textConstant.service3} img={other} href={process.env.REACT_APP_SERVICE3_LINK}/>
                    <AccountToolsItem title={textConstant.service4} img={other} href={process.env.REACT_APP_SERVICE4_LINK}/>
                    <AccountToolsItem title={textConstant.service5} img={other} href={process.env.REACT_APP_SERVICE5_LINK}/>
                    <AccountToolsItem title={textConstant.service6} img={other} href={process.env.REACT_APP_SERVICE6_LINK}/>
                    <AccountToolsItem title={textConstant.service7} img={other} href={process.env.REACT_APP_SERVICE7_LINK}/>
                </div>
            </div>
        </>
    )
}

export default ServicesPage