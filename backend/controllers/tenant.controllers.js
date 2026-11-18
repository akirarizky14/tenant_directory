const { Op } = require('sequelize');
const {TenantModels,UnitModels} = require('../models');

const getTenants = async (req,res) => {
    try {
        const {q,kategori,lantai} = req.query;
        const where = {};
        if (q) {
            where.nama = {[Op.like]: `%${q}%`};
        }
        if (kategori) {
            where.kategori = kategori;
        }
        const include = { model: UnitModels, as: 'unit', attributes: ['unit_id', 'lantai', 'nomor'] };
        if (lantai) include.where = {lantai};

        const tenants = await TenantModels.findAll({where, include, order: [['nama', 'ASC']]})
        res.status(200).json(tenants);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Gagal mendapatkan tenant' });
    }
}

const createTenant = async(req,res) =>{
    try {
        const {nama,kategori} = req.body;
        if (!nama || !String(nama).trim()){
            return res.status(422).json({message : "Nama tenant wajib diisi"})
        }
        const tenant = await TenantModels.create({nama : nama.trim(), kategori });
        res.status(201).json(tenant);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({message : 'Nama Tenant sudah dipakai'});
        }
        if (error.name === 'SequelizeValidationError'){
            return res.status(422).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: 'Gagal membuat tenant' });
    }
}

const editTenant = async(req,res) =>{
    try {
        const {nama,kategori} = req.body;
        const tenant = await TenantModels.findByPk(req.params.id);
        if(!tenant){
            return res.status(404).json({message: 'Tenant tidak ditemukan'});
        }
        if (nama === ''){
            return res.status(422).json({message: 'Nama tenant wajib diisi'});
        }
        await tenant.update({nama,kategori});
        res.status(200).json(tenant);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({message : 'Nama Tenant sudah dipakai'});
        }
        if (error.name === 'SequelizeValidationError'){
            return res.status(422).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: 'Gagal mengubah tenant' });
    }
}

const deleteTenant = async (req,res) =>{
    try {
        const tenant = await TenantModels.findByPk(req.params.id);
        if (!tenant){
            return res.status(404).json({message : 'Tenant tidak ditemukan'});
        }
        await tenant.destroy();
        res.status(200).json({ message: `Tenant ${tenant.nama} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const assignUnit = async (req,res) => {
    try {
        const { unit_id } = req.body;
        const tenant = await TenantModels.findByPk(req.params.id);

        if (!tenant) {
            return res.status(404).json({message: 'Tenant tidak ditemukan'});
        }

        if (unit_id === null){
            await tenant.update({unit_id:null});
            return res.status(200).json(tenant);
        }

        const unit = await UnitModels.findByPk(unit_id);
        if (!unit) {
            return res.status(404).json({message : 'Unit tidak ditemukan'});
        }

        if(tenant.unit_id === unit.unit_id){
            return res.status(200).json(tenant);
        }

        const penghuni = await TenantModels.findOne({where : {unit_id:unit.unit_id}})
        if (penghuni) {
            return res.status(409).json({ message: `Unit ${unit.nomor} sudah dihuni ${penghuni.nama}` });
        }

        await tenant.update({unit_id : unit.unit_id});
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {getTenants,createTenant,editTenant,deleteTenant,assignUnit}