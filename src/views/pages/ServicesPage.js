import HomeHeader from "../containers/HomeHeader"
import AccountToolsItem from "../components/AccountToolsItem"
import service1 from "../../media/images/service1.png"
import service2 from "../../media/images/service2.png"
import service3 from "../../media/images/service3.png"
import service4 from "../../media/images/service4.png"
import service5 from "../../media/images/service5.png"
import service6 from "../../media/images/service6.png"
import service7 from "../../media/images/service7.png"
import GetTextConstant from "../../modules/hooks/GetTextConstant"

function ServicesPage()
{
    const {textConstant} = GetTextConstant()

    return (
        <>
            <HomeHeader/>
            <div className="services">
                <div className="services-items">
                    <AccountToolsItem title={textConstant.service1} img={service1} href={process.env.REACT_APP_SERVICE1_LINK}/>
                    <AccountToolsItem title={textConstant.service2} img={service2} href={process.env.REACT_APP_SERVICE2_LINK}/>
                    <AccountToolsItem title={textConstant.service3} img={service3} href={process.env.REACT_APP_SERVICE3_LINK}/>
                    <AccountToolsItem title={textConstant.service4} img={service4} href={process.env.REACT_APP_SERVICE4_LINK}/>
                    <AccountToolsItem title={textConstant.service5} img={service5} href={process.env.REACT_APP_SERVICE5_LINK}/>
                    <AccountToolsItem title={textConstant.service6} img={service6} href={process.env.REACT_APP_SERVICE6_LINK}/>
                    <AccountToolsItem title={textConstant.service7} img={service7} href={process.env.REACT_APP_SERVICE7_LINK}/>
                </div>
            </div>
        </>
    )
}

export default ServicesPage