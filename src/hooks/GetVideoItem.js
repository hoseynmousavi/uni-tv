import {useContext, useRef} from "react"
import {VideoContext} from "../context/video/VideoReducer"
import GetData from "../modules/request/GetData"
import VideoActions from "../context/video/VideoActions"

function GetVideoItem({id, doAfterGet})
{
    const {state, dispatch} = useContext(VideoContext)
    const {results} = state
    const resultsRef = useRef(null)
    resultsRef.current = results
    const data = resultsRef.current?.[id]
    const isLoading = !data?.video_url
    const cancelToken = useRef(null)

    GetData({
        isLoading,
        request,
        cancelToken,
        doAfterGet: () =>
        {
            const data = resultsRef.current?.[id]
            doAfterGet(data)
        },
    })

    function request()
    {
        return VideoActions.getItem({id, dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
    }

    return {isLoading, data}
}

export default GetVideoItem