const urlConstant = {
    home: "/",

    login: "/login",

    archive: "/archive",
    account: "/account",

    video: videoId => `/video/${videoId}`,

    category: id => `/category/${id}`,
}

export default urlConstant