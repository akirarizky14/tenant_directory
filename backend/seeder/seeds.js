const db = require('../config/database');
const {UnitModels, TenantModels} = require('../models');
const unitData = require('../data/units.json');
const tenantData = require('../data/tenants.json');

async function seed(){
    try {
        await db.authenticate();
        await db.sync();

        await UnitModels.bulkCreate(unitData, {ignoreDuplicates : true});
        await TenantModels.bulkCreate(tenantData, {ignoreDuplicates : true});
        console.log("Seed berhasil");
    } catch (error) {
        console.error('Seed Gagal', error.message);
    } 
}

seed();