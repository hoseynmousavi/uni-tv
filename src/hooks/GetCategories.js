import {useContext, useRef} from "react"
import GetData from "../seyed-modules/request/GetData"
import CategoryActions from "../context/category/CategoryActions"
import {CategoryContext} from "../context/category/CategoryReducer"

function GetCategories({id} = {})
{
    const {state: {list: {results, keys, getDone}}, dispatch} = useContext(CategoryContext)
    const isLoading = !getDone
    const data = id ? results[id] : keys.reduce((sum, item) => [...sum, results[item]], [])
    const cancelToken = useRef(null)

    GetData({request, isLoading, cancelToken})

    function request()
    {
        return CategoryActions.getList({dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
    }

    return {isLoading, data}
}

export default GetCategories