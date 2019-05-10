'use strict';
module.exports = (sequelize, DataTypes) => {
  const sanpham = sequelize.define('sanpham', {
    tensp: DataTypes.TEXT,
    ngaydang: DataTypes.DATE,
    dientich: DataTypes.DOUBLE,
    gia: DataTypes.INTEGER,
    mota_soluoc: DataTypes.TEXT,
    trangthai: DataTypes.TEXT,
    id_loaisp: DataTypes.INTEGER,
    id_huong: DataTypes.INTEGER,
    id_duan: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_vitri: DataTypes.INTEGER,
    id_huyen: DataTypes.INTEGER,
    id_tinh: DataTypes.INTEGER,
    diachi: DataTypes.TEXT,
    chieudai: DataTypes.DOUBLE,
    chieungang: DataTypes.DOUBLE,
    image: DataTypes.TEXT
  }, {});
  sanpham.associate = function (models) {
    // associations can be defined here
  };
  sanpham.check = function (req, res, next) {
    let check = req.body
    if (check.tensp && check.gia && check.mota_soluoc) next();
    else res.json({ mes: 'loi tham so' })
  }
  sanpham.checkuser = async function (req, res, next) {
    try {
      if (req.userData.role == "admin") next()
    } catch (er) {

    }
    let sanpham = await sequelize.query('select * from sanphams where id_user = :id_user and id=:id and trangthai = "No"',
      { replacements: { od_user: [req.userData.id], id: [req.query.id] }, type: sequelize.QueryTypes.SELECT })
    console.log(sanpham)
    if (sanpham.length == 1) next();
    else res.json({
      code: 1111,
      message: "ko chinh chu hoac ko co san pham can thanh toan duoc tim thay"
    })
  }

  return sanpham;
};