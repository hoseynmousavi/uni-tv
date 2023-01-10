import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import getToken from "../../helpers/getToken"
import errorManager from "../../helpers/errorManager"
import {GET_VIDEO_LIST} from "./VideoTypes"

function getList({page = 1, limit = 12, category, cancel, dispatch})
{
    return request.post({url: apiUrlsConstant.getVideos, cancel, data: {token: getToken(), page, limit, category}})
        .then(({result, data, error}) =>
        {
            if (result) dispatch({type: GET_VIDEO_LIST, payload: {data, category}})
            else errorManager({error})
        })
}

const VideoActions = {
    getList,
}

export default VideoActions