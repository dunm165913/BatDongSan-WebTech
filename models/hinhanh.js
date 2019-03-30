'use strict';
module.exports = (sequelize, DataTypes) => {
  const hinhanh = sequelize.define('hinhanh', {
    url: DataTypes.TEXT,
    id_tintuc: DataTypes.INTEGER,
    id_sanpham: DataTypes.INTEGER
  }, {});
  hinhanh.associate = function(models) {
    // associations can be defined here
  };
  return hinhanh;
};