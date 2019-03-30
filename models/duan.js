'use strict';
module.exports = (sequelize, DataTypes) => {
  const duan = sequelize.define('duan', {
    ten: DataTypes.TEXT,
    mota: DataTypes.TEXT
  }, {});
  duan.associate = function(models) {
    // associations can be defined here
  };
  return duan;
};