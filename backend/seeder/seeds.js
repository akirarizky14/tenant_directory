const db = require('../config/database');
const UnitModel = require('../models/unit.models');
const unitData = require('../data/units.json');

async function seed(){
    try {
        await db.authenticate();
        await db.sync();

        await UnitModel.bulkCreate(unitData, {ignoreDuplicates : true});
        console.log("Seed berhasil");
    } catch (error) {
        console.error('Seed Gagal', error.message);
    } 
}

seed();