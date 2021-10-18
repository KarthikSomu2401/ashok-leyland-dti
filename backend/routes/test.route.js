const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
let test_controller = require("../controllers/test.controller");

router.route("/sensorCrossed").post(test_controller.test_sensor_data);
router.route("/testStatus").post(test_controller.test_status);

module.exports = router;