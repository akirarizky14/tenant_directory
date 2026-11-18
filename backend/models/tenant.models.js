const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../config/database');

const kategori_tenant = ['F&B', 'Fashion', 'Elektronik', 'Jasa'];

const Tenant = sequelize.define('Tenant',{
    tenant_id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        unique : true,
        primaryKey : true,
    },
    nama : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    kategori : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isIn : {
                args : [kategori_tenant],
                msg : `Kategori harus salah satu dari : ${kategori_tenant.join(', ')}`
            }
        }
    },
    unit_id : {
        type : DataTypes.UUID,
        allowNull : true,
        unique : true
    }
})

module.exports = Tenant;