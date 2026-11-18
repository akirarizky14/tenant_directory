const {DataTypes, UUIDV4} = require('sequelize');
const db = require('../config/database');

const Unit = db.define('Unit',{
    unit_id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        unique : true,
        primaryKey : true,
    },
    lantai : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nomor : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    luas_m2 : {
        type : DataTypes.DOUBLE,
        allowNull : false
    }
})

module.exports = Unit;