import Switch from "../../seyed-modules/components/Switch"
import Route from "../../seyed-modules/components/Route"
import urlConstant from "../../constant/urlConstant"
import {lazy} from "react"
import Navbar from "./Navbar"

const HomePage = lazy(() => import("../pages/HomePage"))

function HomeContainer()
{
    return (
        <>
            <Switch>
                <Route path={urlConstant.home} render={() => <HomePage/>}/>
            </Switch>
            <Navbar/>
        </>
    )
}

export default HomeContainer