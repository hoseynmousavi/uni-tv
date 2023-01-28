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

function ProfilePage()
{
    const {state: user} = useContext(AuthContext)
    const {textConstant} = GetTextConstant()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({})
    const validationError = Object.keys(values).some(item => values[item] === null)

    function changeField({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function onSubmit()
    {
        setIsLoading(true)
    }

    return (
        <div className="profile">
            <Material className="category-header-back profile-back" onClick={goBack}>
                <BackSvg className="category-header-back-icon"/>
            </Material>

            <div className="profile-avatar">
                <ImageShow src={user.avatar} className="profile-img"/>
                <Material className="profile-edit-img">{textConstant.editAvatar}</Material>
            </div>
            <div className="profile-fields">
                <Input name="firstName"
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
                <Input name="lastName"
                       label={textConstant.lastName}
                       placeholder={textConstant.lastName}
                       defaultValue={user.last_name || ""}
                       onChange={changeField}
                       disableSubmit={validationError}
                       onSubmit={onSubmit}
                       disabled={isLoading}
                       fixScroll
                />
                <Input name="email"
                       validation="email"
                       label={textConstant.email}
                       placeholder={textConstant.email}
                       defaultValue={user.email || ""}
                       onChange={changeField}
                       ltr
                       disableSubmit={validationError}
                       onSubmit={onSubmit}
                       disabled={isLoading}
                       type="email"
                       fixScroll
                />
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