import {lazy, useContext} from "react"
import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import Switch from "./seyed-modules/components/Switch"
import PrivateRoute from "./seyed-modules/components/PrivateRoute"
import {AuthContext} from "./context/auth/AuthReducer"
import urlConstant from "./constant/urlConstant"
import Route from "./seyed-modules/components/Route"
import Navbar from "./views/containers/Navbar"

const VideoPage = lazy(() => import("./views/pages/VideoPage"))
const ArchivePage = lazy(() => import("./views/pages/ArchivePage"))
const AccountPage = lazy(() => import("./views/pages/AccountPage"))
const CategoryPage = lazy(() => import("./views/pages/CategoryPage"))
const HomePage = lazy(() => import("./views/pages/HomePage"))
const LoginPage = lazy(() => import("./views/pages/LoginPage"))

function App()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div id="index-temp" className="index-temp">
            <Switch desktopAnimation isTab tabClassName="main-tab">
                <Route path={urlConstant.video(":videoId")} render={route => <VideoPage route={route}/>}/>
                <Route path={urlConstant.archive} render={() => <ArchivePage/>}/>
                <Route path={urlConstant.account} render={() => <AccountPage/>}/>
                <Route path={urlConstant.category(":id")} render={route => <CategoryPage route={route}/>}/>
                <PrivateRoute user={user} redirectUrl={urlConstant.home} path={urlConstant.login} render={() => <LoginPage/>} ifNotLogin dontChange/>
                <Route path={urlConstant.home} render={() => <HomePage/>}/>
            </Switch>
            <Navbar/>

            <ThemeColorBar/>
            <ToastContainer/>
        </div>
    )
}

export default App