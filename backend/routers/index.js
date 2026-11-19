const express = require('express');
const router = express.Router();

const unitRouters = require('./unit.routers');
const tenantRouters = require('./tenant.routers');

router.use('/units',unitRouters);
router.use('/tenants',tenantRouters);

module.exports = router;
