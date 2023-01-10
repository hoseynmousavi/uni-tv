import toastManager from "../seyed-modules/helpers/toastManager"
import {FAIL_TOAST} from "../seyed-modules/constant/toastTypes"
import errorConstant from "../seyed-modules/constant/errorConstant"

function errorManager({error})
{
    toastManager.addToast({type: FAIL_TOAST, message: errorConstant({response: {data: {message: error?.message}}})})
    // eslint-disable-next-line
    throw null
}

export default errorManager