'use strict';
module.exports = (sequelize, DataTypes) => {
  const mota_chitiet = sequelize.define('mota_chitiet', {
    id_loaisp: DataTypes.INTEGER,
    id_sanpham: DataTypes.INTEGER,
    chieudai: DataTypes.DOUBLE,
    chieungang: DataTypes.DOUBLE,
    phaply: DataTypes.BOOLEAN,
    phongngu: DataTypes.INTEGER,
    phongan: DataTypes.INTEGER,
    bep: DataTypes.INTEGER,
    santhuong: DataTypes.DOUBLE,
    chodexehoi: DataTypes.BOOLEAN,
    chinhchu: DataTypes.BOOLEAN,
    loaidat: DataTypes.TEXT
  }, {});
  mota_chitiet.associate = function(models) {
    // associations can be defined here
  };
  return mota_chitiet;
};