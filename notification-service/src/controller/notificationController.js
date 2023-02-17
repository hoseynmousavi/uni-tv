const data = require("../data/index")
const webPush = require("web-push")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: data.dbHost,
    user: data.dbUser,
    password: data.dbPass,
    database: data.dbName,
})

connection.connect(function (err)
{
    if (err) throw err
    console.log("Connected!")
})

webPush.setGCMAPIKey(data.firebaseKey)
webPush.setVapidDetails(
    "mailto:hoseyn.mousavi78@gmail.com",
    data.notificationPublicKey,
    data.notificationPrivateKey,
)

function getToken(req, res)
{
    console.log("OK")
}

const notificationController = {
    getToken,
}

module.exports = notificationController