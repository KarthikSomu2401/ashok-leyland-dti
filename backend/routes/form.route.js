const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
let form_controller = require("../controllers/form.controller");

router.route("/getform").post(form_controller.get_form);
router.route("/createUserTestDetails").post(form_controller.create_test);
router.route("/getTestDetails/:testId").get(form_controller.get_test_details);

module.exports = router;