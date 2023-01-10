import {useContext, useRef} from "react"
import GetData from "../seyed-modules/request/GetData"
import {VideoContext} from "../context/video/VideoReducer"
import VideoActions from "../context/video/VideoActions"

function GetVideoList({category})
{
    const {state, dispatch} = useContext(VideoContext)
    const {results} = state
    const {keys, getDone} = state[category] || {}
    const isLoading = category ? !getDone : false
    const data = keys?.length ? keys.reduce((sum, item) => [...sum, results[item]], []) : []
    const cancelToken = useRef(null)

    GetData({request, isLoading, cancelToken, dependencies: [category]})

    function request()
    {
        return VideoActions.getList({category, dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
    }

    return {isLoading, data}
}

export default GetVideoList