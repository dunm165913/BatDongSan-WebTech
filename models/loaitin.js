'use strict';
module.exports = (sequelize, DataTypes) => {
  const loaitin = sequelize.define('loaitin', {
    ten: DataTypes.TEXT
  }, {});
  loaitin.associate = function(models) {
    // associations can be defined here
  };
  return loaitin;
};