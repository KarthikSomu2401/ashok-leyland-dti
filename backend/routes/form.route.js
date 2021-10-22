const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
let form_controller = require("../controllers/form.controller");

router.route("/createUserTestDetails").post(form_controller.create_test);
router.route("/getAllTestDetails").get(form_controller.get_all_test_details);
router.route("/startTest/:testId").get(form_controller.start_test);
//router.route("/endTest/:testId").get(form_controller.end_test);
router.route("/getTestDetails/:testId").get(form_controller.get_test_details);
router.route("/updateTestDetails").post(form_controller.test_status_update);
router.route("/updateTestRemarks/:testId").post(form_controller.test_status_remarks);

module.exports = router;