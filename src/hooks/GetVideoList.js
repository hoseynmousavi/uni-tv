import {useCallback, useContext, useEffect, useRef, useState} from "react"
import {VideoContext} from "../context/video/VideoReducer"
import VideoActions from "../context/video/VideoActions"
import {REQUEST_CANCEL} from "../seyed-modules/constant/toastTypes"

function GetVideoList({category})
{
    const [getMoreLoading, setGetMoreLoading] = useState(false)
    const {state, dispatch} = useContext(VideoContext)
    const {results} = state
    const {keys, paginator} = state[category] || {}
    const {count, page} = paginator || {}
    const isLoading = category ? !page || getMoreLoading : false
    const data = keys?.length ? keys.reduce((sum, item) => [...sum, results[item]], []) : []
    const cancelToken = useRef(null)

    function getData()
    {
        VideoActions.getList({page: page ? page + 1 : 1, category, dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
            .then(() => setGetMoreLoading(false))
    }

    const getMore = useCallback(() =>
    {
        if (!isLoading && page < count)
        {
            setGetMoreLoading(true)
            getData()
        }
        // eslint-disable-next-line
    }, [isLoading, page, count])

    useEffect(() =>
    {
        if (isLoading) getData()
        return () =>
        {
            cancelToken?.current?.cancel?.(REQUEST_CANCEL)
            setGetMoreLoading(false)
        }
        // eslint-disable-next-line
    }, [category])

    return {isLoading, data, getMore}
}

export default GetVideoList