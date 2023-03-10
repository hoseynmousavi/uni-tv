const urlConstant = {
    home: "/",
    login: "/login",
    archive: "/archive",
    account: "/account",
    about: "/about",
    privacy: "/privacy",
    sendVideo: "/send-video",
    services: "/services",
    profile: "/profile",
    video: videoId => `/video/${videoId}`,
    category: id => `/category/${id}`,
}

export default urlConstant