import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./modules/helpers/withRouter"
import ThemeProvider from "./modules/context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"
import changeColorVariablesConstant from "./constant/changeColorVariablesConstant"
import request from "./modules/request/request"
import offlineSending from "./constant/offlineSending"
import changeFontVariablesConstant from "./constant/changeFontVariablesConstant"
import LanguageProvider from "./modules/context/language/LanguageReducer"
import CategoryProvider from "./context/category/CategoryReducer"
import VideoProvider from "./context/video/VideoReducer"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <LanguageProvider changeVariables={changeFontVariablesConstant}>
        <ThemeProvider changeVariables={changeColorVariablesConstant}>
            <AuthProvider>
                <CategoryProvider>
                    <VideoProvider>
                        <WrappedApp/>
                    </VideoProvider>
                </CategoryProvider>
            </AuthProvider>
        </ThemeProvider>
    </LanguageProvider>,
)

request.init({
    offlineSendingArr: offlineSending,
})

registerSW()