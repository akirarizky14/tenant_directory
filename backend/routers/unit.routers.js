const express = require('express');
const router = express.Router();

const {getUnits} = require('../controllers/unit.controllers');

router.get('/units', getUnits);

module.exports = router;