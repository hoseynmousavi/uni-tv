import {SET_USER} from "./AuthTypes"
import request from "../../modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import toastManager from "../../modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../modules/constant/toastTypes"
import errorManager from "../../helpers/errorManager"
import getToken from "../../helpers/getToken"
import getHeader from "../../helpers/getHeader"

function login({email, password, dispatch})
{
    const data = new FormData()
    data.append("identity", email)
    data.append("credential", password)
    return request.post({url: apiUrlsConstant.login, data, headers: getHeader()})
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
    return request.post({url: apiUrlsConstant.register, data, headers: getHeader()})
        .then(({result, data, error}) =>
        {
            if (result && data?.[0]?.message) toastManager.addToast({type: SUCCESS_TOAST, message: data[0].message})
            else errorManager({error})
        })
}

function getUser({dispatch})
{
    return request.post({url: apiUrlsConstant.getUser, dontToast: true, data: {token: getToken()}, headers: getHeader()})
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
    return request.post({url: apiUrlsConstant.logout, data: {token: getToken()}, headers: getHeader()})
}

function update({user, dispatch})
{
    return request.post({url: apiUrlsConstant.update, data: {...user, token: getToken()}, headers: getHeader()})
        .then(({result, data, error}) =>
        {
            if (result && data.length === 1)
            {
                setUser({user, dispatch})
                return data[0].message
            }
            else errorManager({error})
        })
}

function updateAvatar({avatar, dispatch})
{
    const data = new FormData()
    data.append("token", getToken())
    data.append("avatar", avatar)
    return request.post({url: apiUrlsConstant.updateAvatar, data, headers: getHeader()})
        .then(({result, data, error}) =>
        {
            if (result && data?.length === 1) setUser({user: {avatar: data[0].url}, dispatch})
            else errorManager({error})
        })
}

const AuthActions = {
    login,
    register,
    getUser,
    setUser,
    logout,
    update,
    updateAvatar,
}

export default AuthActions