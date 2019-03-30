'use strict';
module.exports = (sequelize, DataTypes) => {
  const vitri = sequelize.define('vitri', {
    ten: DataTypes.TEXT,
    mota: DataTypes.TEXT
  }, {});
  vitri.associate = function(models) {
    // associations can be defined here
  };
  return vitri;
};