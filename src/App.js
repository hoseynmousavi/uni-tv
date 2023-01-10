import {useContext, lazy} from "react"
import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import Switch from "./seyed-modules/components/Switch"
import PrivateRoute from "./seyed-modules/components/PrivateRoute"
import {AuthContext} from "./context/auth/AuthReducer"
import urlConstant from "./constant/urlConstant"

const LoginContainer = lazy(() => import("./views/containers/LoginContainer"))
const HomeContainer = lazy(() => import("./views/containers/HomeContainer"))

function App()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            <Switch>
                <PrivateRoute user={user} redirectUrl={urlConstant.home} path={urlConstant.login} render={() => <LoginContainer/>} ifNotLogin dontChange/>
                <PrivateRoute user={user} redirectUrl={urlConstant.login} path={urlConstant.home} render={() => <HomeContainer/>}/>
            </Switch>
            <ToastContainer/>
        </div>
    )
}

export default App