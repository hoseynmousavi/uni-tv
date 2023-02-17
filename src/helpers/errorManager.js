import toastManager from "../modules/helpers/toastManager"
import {FAIL_TOAST} from "../modules/constant/toastTypes"
import errorConstant from "../modules/constant/errorConstant"

function errorManager({error})
{
    toastManager.addToast({type: FAIL_TOAST, message: errorConstant({response: {data: {message: error?.message}}})})
    // eslint-disable-next-line
    throw null
}

export default errorManager