const express = require('express');
const router = express.Router();

const unitRouters = require('./unit.routers');
const tenantRouters = require('./tenant.routers');

router.use(unitRouters);
router.use(tenantRouters);

module.exports = router;