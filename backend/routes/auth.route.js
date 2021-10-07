const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
let middleware = require("../handlers/middleware");
let auth_controller = require("../controllers/auth.controller");

router.route("/createuser").post(auth_controller.create_user);
router.route("/loginuser").post(auth_controller.login_user);
router
    .route("/logoutuser")
    .get(middleware.checkToken)
    .get(auth_controller.logout_user);

router.route("/verifytoken").get(middleware.checkToken);

module.exports = router;