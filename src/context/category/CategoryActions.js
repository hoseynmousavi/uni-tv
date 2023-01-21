import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import getToken from "../../helpers/getToken"
import errorManager from "../../helpers/errorManager"
import {GET_CATEGORIES} from "./CategoryTypes"
import getHeader from "../../helpers/getHeader"

function getList({cancel, dispatch})
{
    return request.post({url: apiUrlsConstant.getCategories, cancel, data: {token: getToken()}, headers: getHeader(), dontCache: false})
        .then(({result, data, error}) =>
        {
            if (result) dispatch({type: GET_CATEGORIES, payload: {data}})
            else errorManager({error})
        })
}

const CategoryActions = {
    getList,
}

export default CategoryActions