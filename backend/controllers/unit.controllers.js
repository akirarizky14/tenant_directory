const { TenantModels, UnitModels } = require('../models');

const getUnits = async (req, res) => {
  try {
    const { lantai, status } = req.query;
    if (status && status !== 'terisi' && status !== 'kosong') {
      return res
        .status(422)
        .json({ message: 'Status harus terisi atau kosong' });
    }
    const where = {};
    if (lantai) {
      where.lantai = lantai;
    }
    let units = await UnitModels.findAll({
      where,
      include: { model: TenantModels, as: 'tenant' },
      order: [['nomor', 'ASC']],
    });
    if (status === 'terisi') {
      units = units.filter((u) => u.tenant);
    }
    if (status === 'kosong') {
      units = units.filter((u) => !u.tenant);
    }
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUnits,
};
