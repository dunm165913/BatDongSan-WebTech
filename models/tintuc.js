'use strict';
module.exports = (sequelize, DataTypes) => {
  const tintuc = sequelize.define('tintuc', {
    ten: DataTypes.TEXT,
    noidung: DataTypes.TEXT,
    id_loaitin: DataTypes.INTEGER
  }, {});
  tintuc.associate = function(models) {
    // associations can be defined here
  };
  return tintuc;
};