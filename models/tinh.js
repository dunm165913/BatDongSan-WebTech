'use strict';
module.exports = (sequelize, DataTypes) => {
  const tinh = sequelize.define('tinh', {
    ten: DataTypes.TEXT
  }, {});
  tinh.associate = function(models) {
    // associations can be defined here
  };
  return tinh;
};