import cookieHelper from "../seyed-modules/helpers/cookieHelper"

function getToken()
{
    return cookieHelper.getItem("token") || "user-505-Ms4oyb5mZqo4TaEXKkBDeG4rdecdNclY"
}

export default getToken