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
    id_tinh: DataTypes.INTEGER
  }, {});
  sanpham.associate = function(models) {
    // associations can be defined here
  };
  return sanpham;
};