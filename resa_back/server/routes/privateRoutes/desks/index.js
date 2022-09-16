const express = require('express');
const router = express.Router();

router.post('/', require("./createDesk"));
// router.put('/', require("./updateDesk"))
router.get('/', require("./getAvailableDesk"))
router.get('/department', require("./getAvailableDeskByDepartment"))

module.exports = router;