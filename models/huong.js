'use strict';
module.exports = (sequelize, DataTypes) => {
  const huong = sequelize.define('huong', {
    ten_huong: DataTypes.TEXT
  }, {});
  huong.associate = function(models) {
    // associations can be defined here
  };
  return huong;
};