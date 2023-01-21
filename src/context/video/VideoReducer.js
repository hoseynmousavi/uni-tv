import {createContext, useReducer} from "react"
import {GET_VIDEO_ITEM, GET_VIDEO_LIST} from "./VideoTypes"

export const VideoContext = createContext(null)

function VideoProvider({children})
{
    const initialState = {}
    const init = () => initialState
    const [state, dispatch] = useReducer(reducer, initialState, init)

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_VIDEO_LIST:
            {
                const {data: {videos, paginator: {count, limit, page}}, category} = action.payload
                return {
                    ...state,
                    results: {
                        ...state.results,
                        ...videos.reduce((sum, item) => ({...sum, [item.id]: {...item, ...(state.results?.[item.id] ?? {})}}), {}),
                    },
                    [category]: {
                        ...state[category],
                        keys: [...new Set([...(state[category]?.keys ?? []), ...videos.map(item => item.id)])],
                        paginator: {
                            count: Math.ceil(count / limit),
                            limit,
                            page,
                        },
                    },
                }
            }
            case GET_VIDEO_ITEM:
            {
                const {data} = action.payload
                return {
                    ...state,
                    results: {
                        ...state.results,
                        [data.id]: {
                            ...(state?.results?.[data.id] ?? {}),
                            ...data,
                        },
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
        <VideoContext.Provider value={{state, dispatch}}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoProvider