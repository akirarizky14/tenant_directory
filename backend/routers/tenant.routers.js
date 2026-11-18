const express = require('express');
const router = express.Router();

const {getTenants,createTenant,editTenant,deleteTenant,assignUnit} = require('../controllers/tenant.controllers');

router.get('/tenants', getTenants);
router.post('/tenants', createTenant);
router.put('/tenants/:id', editTenant);
router.delete('/tenants/:id', deleteTenant);
router.put('/tenants/:id/unit', assignUnit);

module.exports = router;