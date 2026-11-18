const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../config/database');

const Unit = sequelize.define('Unit',{
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
        allowNull : false
    },
    luas_m2 : {
        type : DataTypes.DOUBLE,
        allowNull : false
    }
})

module.exports = Unit;