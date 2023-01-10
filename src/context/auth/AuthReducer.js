import {createContext, useEffect, useReducer, useState} from "react"
import {LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../seyed-modules/helpers/logoutManager"
import cookieHelper from "../../seyed-modules/helpers/cookieHelper"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"

export const AuthContext = createContext(null)

function AuthProvider({children})
{
    const initialState = null
    const init = () => initialState
    const [isLogging, setIsLogging] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const token = cookieHelper.getItem("token")
        if (token)
        {
            const user = localStorage.getItem("user")
            if (user)
            {
                try
                {
                    AuthActions.setUser({user: JSON.parse(user), dispatch})
                }
                catch (e)
                {
                    console.log("err parsing user:", e.message)
                }
            }
            else setIsLogging(true)

            AuthActions.getUser({dispatch})
                .then(() => setIsLogging(false))
                .catch(() => setIsLogging(false))
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    function reducer(state, action)
    {
        switch (action.type)
        {
            case SET_USER:
            {
                const {user: userArg} = action.payload
                const user = {...state, ...userArg}
                saveUserToDisk(user)
                return user
            }
            case LOGOUT:
            {
                saveUserToDisk(null)
                return init()
            }
            default:
            {
                throw new Error()
            }
        }
    }

    function saveUserToDisk(user)
    {
        if (user)
        {
            if (user.token)
            {
                cookieHelper.setItem("token", user.token)
                delete user.token
            }
            localStorage.setItem("user", JSON.stringify(user))
        }
        else
        {
            cookieHelper.removeItem("token")
            localStorage.clear()
        }
    }

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {
                isLogging ?
                    <LoadingWrapper haveBg/>
                    :
                    children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider