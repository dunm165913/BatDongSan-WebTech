'use strict';
module.exports = (sequelize, DataTypes) => {
  const huyen = sequelize.define('huyen', {
    ten_huyen: DataTypes.TEXT
  }, {});
  huyen.associate = function(models) {
    // associations can be defined here
  };
  return huyen;
};