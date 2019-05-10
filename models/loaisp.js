'use strict';
module.exports = (sequelize, DataTypes) => {
  const loaisp = sequelize.define('loaisp', {
    ten_sp: DataTypes.TEXT,
    mota: DataTypes.TEXT
  }, {});
  loaisp.associate = function(models) {
    // associations can be defined here
  };
  return loaisp;
};