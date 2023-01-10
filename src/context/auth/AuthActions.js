import {SET_USER} from "./AuthTypes"
import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import errorManager from "../../helpers/errorManager"
import getToken from "../../helpers/getToken"

function login({email, password, dispatch})
{
    const data = new FormData()
    data.append("identity", email)
    data.append("credential", password)
    return request.post({url: apiUrlsConstant.login, data})
        .then(({result, data, error}) =>
        {
            if (result && data?.length === 1) setUser({user: data[0], dispatch})
            else errorManager({error})
        })
}

function register({email, password})
{
    const data = new FormData()
    data.append("email", email)
    data.append("credential", password)
    return request.post({url: apiUrlsConstant.register, data})
        .then(({result, data, error}) =>
        {
            if (result && data?.[0]?.message) toastManager.addToast({type: SUCCESS_TOAST, message: data[0].message})
            else errorManager({error})
        })
}

function getUser({dispatch})
{
    return request.post({url: apiUrlsConstant.getUser, dontToast: true, data: {token: getToken()}})
        .then(({result, data, error}) =>
        {
            if (result && data?.length === 1) setUser({user: data[0], dispatch})
            else errorManager({error})
        })
}

function setUser({user, dispatch})
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

function logout()
{
    return request.post({url: apiUrlsConstant.logout, data: {token: getToken()}})
}

const AuthActions = {
    login,
    register,
    getUser,
    setUser,
    logout,
}

export default AuthActions