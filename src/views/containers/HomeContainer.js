import Switch from "../../seyed-modules/components/Switch"
import Route from "../../seyed-modules/components/Route"
import urlConstant from "../../constant/urlConstant"
import {lazy} from "react"
import Navbar from "./Navbar"

const CategoryPage = lazy(() => import("../pages/CategoryPage"))
const HomePage = lazy(() => import("../pages/HomePage"))
const AccountPage = lazy(() => import("../pages/AccountPage"))

function HomeContainer()
{
    return (
        <>
            <Switch>
                <Route path={urlConstant.account} render={() => <AccountPage/>}/>
                <Route path={urlConstant.category(":id")} render={route => <CategoryPage route={route}/>}/>
                <Route path={urlConstant.home} render={() => <HomePage/>}/>
            </Switch>
            <Navbar/>
        </>
    )
}

export default HomeContainer