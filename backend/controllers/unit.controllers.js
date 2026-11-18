const UnitModel = require('../models/unit.models');

const getUnits = (req,res)=>{
    try {
        const data = UnitModel.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getUnits}