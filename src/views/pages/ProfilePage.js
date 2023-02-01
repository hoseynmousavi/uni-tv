import Input from "../components/Input"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import {useContext, useState} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import Button from "../../seyed-modules/components/Button"
import ImageShow from "../../seyed-modules/components/ImageShow"
import Material from "../../seyed-modules/components/Material"
import BackSvg from "../../media/svg/BackSvg"
import goBack from "../../seyed-modules/helpers/goBack"
import authActions from "../../context/auth/AuthActions"
import closeAndToast from "../../seyed-modules/helpers/closeAndToast"
import {SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import compressImage from "../../helpers/compressImage"
import toastManager from "../../seyed-modules/helpers/toastManager"

function ProfilePage()
{
    const {state: user, dispatch} = useContext(AuthContext)
    const {textConstant, toastConstant} = GetTextConstant()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({})
    const validationError = Object.keys(values).some(item => values[item] === null) || isLoading

    function changeField({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function onFileChange(e)
    {
        setIsLoading(true)
        const file = e.target.files[0]
        e.target.value = ""
        compressImage(file, "profileImage").then(avatar =>
        {
            authActions.updateAvatar({avatar, dispatch})
                .then(() =>
                {
                    setIsLoading(false)
                    toastManager.addToast({message: toastConstant.userUpdated, type: SUCCESS_TOAST})
                })
                .catch(() =>
                {
                    setIsLoading(false)
                })
        })
    }

    function onSubmit()
    {
        const {first_name, last_name, email} = values
        const data = {}
        if ((first_name || first_name === "") && first_name !== (user.first_name || "")) data.first_name = first_name
        if ((last_name || last_name === "") && last_name !== (user.last_name || "")) data.last_name = last_name
        if ((email || email === "") && email !== (user.email || "")) data.email = email

        if (Object.values(data).length > 0)
        {
            setIsLoading(true)
            authActions.update({user: data, dispatch})
                .then(message =>
                {
                    setIsLoading(false)
                    closeAndToast({toast: {message, type: SUCCESS_TOAST}})
                })
                .catch(() =>
                {
                    setIsLoading(false)
                })
        }
        else
        {
            closeAndToast({toast: {message: toastConstant.userUpdated, type: SUCCESS_TOAST}})
        }
    }

    return (
        <div className="profile">
            <Material className="category-header-back profile-back" onClick={goBack}>
                <BackSvg className="category-header-back-icon"/>
            </Material>

            <div className="profile-avatar">
                <ImageShow src={user.avatar} className="profile-img"/>
                <label>
                    <Material isDiv className="profile-edit-img">{textConstant.editAvatar}</Material>
                    <input hidden type="file" accept="image/*" onChange={onFileChange}/>
                </label>
            </div>
            <div className="profile-fields">
                <Input name="first_name"
                       label={textConstant.firstName}
                       placeholder={textConstant.firstName}
                       defaultValue={user.first_name || ""}
                       onChange={changeField}
                       focusOnMountDesktop
                       disableSubmit={validationError}
                       onSubmit={onSubmit}
                       disabled={isLoading}
                       fixScroll
                />
                <Input name="last_name"
                       label={textConstant.lastName}
                       placeholder={textConstant.lastName}
                       defaultValue={user.last_name || ""}
                       onChange={changeField}
                       disableSubmit={validationError}
                       onSubmit={onSubmit}
                       disabled={isLoading}
                       fixScroll
                />
                {/*<Input name="email"*/}
                {/*       validation="email"*/}
                {/*       label={textConstant.email}*/}
                {/*       placeholder={textConstant.email}*/}
                {/*       defaultValue={user.email || ""}*/}
                {/*       onChange={changeField}*/}
                {/*       ltr*/}
                {/*       disableSubmit={validationError}*/}
                {/*       onSubmit={onSubmit}*/}
                {/*       disabled={isLoading}*/}
                {/*       type="email"*/}
                {/*       fixScroll*/}
                {/*/>*/}
            </div>
            <BtnBottomFullScreen>
                <Button className="login-bottom-btn" loading={isLoading} disable={validationError} type="second" onClick={onSubmit}>
                    {textConstant.save}
                </Button>
            </BtnBottomFullScreen>
        </div>
    )
}

export default ProfilePage