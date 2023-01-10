import cookieHelper from "../seyed-modules/helpers/cookieHelper"

function getToken()
{
    return cookieHelper.getItem("token")
}

export default getToken