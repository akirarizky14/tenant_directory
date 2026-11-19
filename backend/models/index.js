const UnitModels = require('./unit.models');
const TenantModels = require('./tenant.models');
const { db } = require('../config/database');

// Relasi antar Table
TenantModels.belongsTo(UnitModels, { foreignKey: 'unit_id', as: 'unit' });
UnitModels.hasOne(TenantModels, { foreignKey: 'unit_id', as: 'tenant' });

module.exports = { db, UnitModels, TenantModels };
