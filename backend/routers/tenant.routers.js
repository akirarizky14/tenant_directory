const express = require('express');
const router = express.Router();

const {
  getTenants,
  createTenant,
  editTenant,
  deleteTenant,
  assignUnit,
} = require('../controllers/tenant.controllers');

router.get('/', getTenants);
router.post('/', createTenant);
router.put('/:id', editTenant);
router.delete('/:id', deleteTenant);
router.put('/:id/unit', assignUnit);

module.exports = router;
