import cookieHelper from "../seyed-modules/helpers/cookieHelper"

function getToken()
{
    return cookieHelper.getItem("token") || "GTYMA9gCDZHZDV5P"
}

export default getToken