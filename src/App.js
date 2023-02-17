import {lazy, useContext} from "react"
import ToastContainer from "./modules/components/ToastContainer"
import ThemeColorBar from "./modules/components/ThemeColorBar"
import Switch from "./modules/components/Switch"
import PrivateRoute from "./modules/components/PrivateRoute"
import {AuthContext} from "./context/auth/AuthReducer"
import urlConstant from "./constant/urlConstant"
import Route from "./modules/components/Route"
import Navbar from "./views/containers/Navbar"

const SendVideoPage = lazy(() => import("./views/pages/SendVideoPage"))
const VideoPage = lazy(() => import("./views/pages/VideoPage"))
const ArchivePage = lazy(() => import("./views/pages/ArchivePage"))
const ServicesPage = lazy(() => import("./views/pages/ServicesPage"))
const ProfilePage = lazy(() => import("./views/pages/ProfilePage"))
const AccountPage = lazy(() => import("./views/pages/AccountPage"))
const PrivacyPage = lazy(() => import("./views/pages/PrivacyPage"))
const AboutPage = lazy(() => import("./views/pages/AboutPage"))
const CategoryPage = lazy(() => import("./views/pages/CategoryPage"))
const HomePage = lazy(() => import("./views/pages/HomePage"))
const LoginPage = lazy(() => import("./views/pages/LoginPage"))

function App()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div id="index-temp" className="index-temp">
            <Switch>
                <Route path={urlConstant.video(":videoId")} render={route => <VideoPage route={route}/>}/>
                <Route path={urlConstant.archive} render={() => <ArchivePage/>}/>
                <Route path={urlConstant.services} render={() => <ServicesPage/>}/>
                <Route path={urlConstant.account} render={() => <AccountPage/>}/>
                <Route path={urlConstant.privacy} render={() => <PrivacyPage/>}/>
                <Route path={urlConstant.about} render={() => <AboutPage/>}/>
                <Route path={urlConstant.sendVideo} render={() => <SendVideoPage/>}/>
                <Route path={urlConstant.category(":id")} render={route => <CategoryPage route={route}/>}/>
                <PrivateRoute path={urlConstant.profile} render={() => <ProfilePage/>} user={user} redirectUrl={urlConstant.home}/>
                <PrivateRoute path={urlConstant.login} render={() => <LoginPage/>} user={user} redirectUrl={urlConstant.home} ifNotLogin dontChange/>
                <Route path={urlConstant.home} render={() => <HomePage/>}/>
            </Switch>

            <Navbar/>

            <ThemeColorBar/>
            <ToastContainer/>
        </div>
    )
}

export default App