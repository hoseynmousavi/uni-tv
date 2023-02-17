import {createContext, useEffect, useReducer} from "react"
import {CHANGE_LANGUAGE} from "./LanguageTypes"
import LanguageActions from "./LanguageActions"
import changeLayoutByLang from "../../helpers/changeLayoutByLang"

export const LanguageContext = createContext(null)

function LanguageProvider({children, changeVariables, defaultLanguage = "fa"})
{
    const initialState = {
        language: defaultLanguage,
    }

    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        return initialState
    }

    function reducer(state, action)
    {
        switch (action.type)
        {
            case CHANGE_LANGUAGE:
            {
                const {language} = action.payload
                changeLayoutByLang({language, changeVariables})
                return {
                    ...state,
                    language,
                }
            }
            default:
            {
                throw new Error()
            }
        }
    }

    useEffect(() =>
    {
        const language = localStorage.getItem("language")
        if (language && language !== defaultLanguage) LanguageActions.changeLanguage({language, dispatch})
        // eslint-disable-next-line
    }, [])

    return (
        <LanguageContext.Provider value={{state, dispatch}}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider