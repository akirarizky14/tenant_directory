const { TenantModels,UnitModels } = require('../models');

const getUnits = async (req,res)=>{
    try {
        const data = await UnitModels.findAll({include: {model:TenantModels, as :'tenant'}});
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUnits,
}