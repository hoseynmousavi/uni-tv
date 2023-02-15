import {createContext, useReducer} from "react"
import {GET_CATEGORIES} from "./CategoryTypes"

export const CategoryContext = createContext(null)

function CategoryProvider({children})
{
    const initialState = {
        list: {
            results: {},
            keys: [],
            getDone: false,
        },
    }
    const init = () => initialState
    const [state, dispatch] = useReducer(reducer, initialState, init)

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_CATEGORIES:
            {
                const {data} = action.payload
                const items = data[0]?.reverse?.() ?? []
                return {
                    ...state,
                    list: {
                        results: {...state.results, ...items.reduce((sum, item) => ({...sum, [item.id]: item}), {})},
                        keys: [...new Set([...state.list.keys, ...items.map(item => item.id)])],
                        getDone: true,
                    },
                }
            }
            default:
            {
                throw new Error()
            }
        }
    }

    return (
        <CategoryContext.Provider value={{state, dispatch}}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider