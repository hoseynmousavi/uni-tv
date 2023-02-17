const notificationController = require("../controller/notificationController")

function notificationRouter(app)
{
    app.route("/notification")
        .get(notificationController.getToken)
}

module.exports = notificationRouter