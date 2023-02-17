import LogoSvg from "../../media/svg/LogoSvg"
import Input from "../components/Input"
import GetTextConstant from "../../modules/hooks/GetTextConstant"
import Link from "../../modules/components/Link"
import Material from "../../modules/components/Material"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import Button from "../../modules/components/Button"
import {useContext, useState} from "react"
import createMaterialColor from "../../modules/helpers/createMaterialColor"
import ArrowSvg from "../../media/svg/ArrowSvg"
import toastManager from "../../modules/helpers/toastManager"
import {FAIL_TOAST, INFO_TOAST} from "../../modules/constant/toastTypes"
import AuthActions from "../../context/auth/AuthActions"
import {AuthContext} from "../../context/auth/AuthReducer"
import parseQueryString from "../../modules/helpers/parseQueryString"
import urlConstant from "../../constant/urlConstant"
import CategoryHeader from "../containers/CategoryHeader"

function LoginPage()
{
    const {dispatch} = useContext(AuthContext)
    const {textConstant, toastConstant} = GetTextConstant()
    const [isRegister, setIsRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({})
    const {email, password, passwordConfirm} = values
    const fieldsDisable = isLoading
    const submitDisable = !(!isLoading && (isRegister ? email && password && passwordConfirm && password === passwordConfirm : email && password))

    function toggleSignIn()
    {
        setIsRegister(isRegister => !isRegister)
    }

    function onSubmitDisable()
    {
        toastManager.addToast({message: toastConstant.enterAllFields, type: FAIL_TOAST})
    }

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function submit()
    {
        setIsLoading(true)
        if (!isRegister)
        {
            AuthActions.login({email, password, dispatch})
                .then(() =>
                {
                    setIsLoading(false)
                    const {returnTo} = parseQueryString()
                    window.history.replaceState("", "", returnTo ? returnTo : urlConstant.home)
                })
                .catch(() =>
                {
                    setIsLoading(false)
                })
        }
        else
        {
            AuthActions.register({email, password})
                .then(() =>
                {
                    setIsLoading(false)
                    setIsRegister(false)
                    setTimeout(() => toastManager.addToast({type: INFO_TOAST, message: toastConstant.loginNow}), 200)
                })
                .catch(() =>
                {
                    setIsLoading(false)
                })
        }
    }

    return (
        <div className="login">
            <CategoryHeader data={{title: textConstant[isRegister ? "registerTitle" : "loginTitle"]}} />
            <div/>
            <div className="login-content">
                <LogoSvg className="login-content-logo"/>
                {/*<h1 className="login-content-title">{}</h1>*/}
                {/*<p className="login-content-desc">{textConstant[isRegister ? "registerDesc" : "loginDesc"]}</p>*/}
                <Input className="login-content-email"
                       type="email"
                       validation="email"
                       label={textConstant.email}
                       placeholder={textConstant.emailPlaceholder}
                       fixScroll
                       name="email"
                       autoComplete="off"
                       Icon=""
                       ltr
                       onChange={onChange}
                       disabled={fieldsDisable}
                       disableSubmit={submitDisable}
                       onSubmitDisable={onSubmitDisable}
                       onSubmit={submit}
                       focusOnMountDesktop
                />
                <Input type="password"
                       validation="password"
                       label={textConstant.password}
                       placeholder={textConstant.passwordPlaceholder}
                       fixScroll
                       name="password"
                       autoComplete="off"
                       Icon=""
                       ltr
                       onChange={onChange}
                       disabled={fieldsDisable}
                       disableSubmit={submitDisable}
                       onSubmitDisable={onSubmitDisable}
                       onSubmit={submit}
                />
                <div className={`login-content-password ${isRegister ? "" : "hide"}`} aria-hidden={!isRegister} aria-disabled={!isRegister}>
                    <Input type="password"
                           validation="confirm_password"
                           password={password}
                           label={textConstant.passwordConfirm}
                           placeholder={textConstant.passwordConfirmPlaceholder}
                           fixScroll
                           name="passwordConfirm"
                           autoComplete="off"
                           Icon=""
                           ltr
                           onChange={onChange}
                           disabled={fieldsDisable || !isRegister}
                           disableSubmit={submitDisable}
                           onSubmitDisable={onSubmitDisable}
                           onSubmit={submit}
                    />
                </div>
                <Material className="login-content-register" backgroundColor={createMaterialColor({variable: "--first-color"})} onClick={toggleSignIn}>
                    {
                        isRegister ?
                            <div className="login-content-register-btn">
                                <ArrowSvg className="login-content-register-btn-icon"/>
                                {textConstant.haveAcc}
                            </div>
                            :
                            <>
                                {textConstant.dontHaveAcc}
                                <span className="login-content-register-desc">{textConstant.dontHaveAccDesc}</span>
                            </>
                    }
                </Material>
            </div>
            <div className="login-bottom">
                <div className="login-privacy">
                    {textConstant.privacyIntro}
                    <Link to={urlConstant.privacy}>
                        <Material className="login-privacy-link">
                            {textConstant.privacyTitle}
                        </Material>
                    </Link>
                    {textConstant.privacyEnd}
                </div>
                <BtnBottomFullScreen>
                    <Button className="login-bottom-btn" loading={isLoading} disable={submitDisable} type="second" onClick={submit}>
                        {textConstant[isRegister ? "register" : "login"]}
                    </Button>
                </BtnBottomFullScreen>
            </div>
        </div>
    )
}

export default LoginPage