import request from "../../modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import getToken from "../../helpers/getToken"
import errorManager from "../../helpers/errorManager"
import {GET_VIDEO_ITEM, GET_VIDEO_LIST} from "./VideoTypes"
import getHeader from "../../helpers/getHeader"

function getList({page = 1, limit = 8, category, cancel, dispatch})
{
    return request.post({url: apiUrlsConstant.getVideos, cancel, data: {token: getToken(), page, limit, category}, headers: getHeader(), dontCache: false})
        .then(({result, data, error}) =>
        {
            if (result) dispatch({type: GET_VIDEO_LIST, payload: {data, category}})
            else errorManager({error})
        })
}

function getItem({id, cancel, dispatch})
{
    return request.post({url: apiUrlsConstant.getVideo, cancel, data: {token: getToken(), id}, headers: getHeader(), dontCache: false})
        .then(({result, data, error}) =>
        {
            if (result) dispatch({type: GET_VIDEO_ITEM, payload: {data}})
            else errorManager({error})
        })
}

const VideoActions = {
    getList,
    getItem,
}

export default VideoActions