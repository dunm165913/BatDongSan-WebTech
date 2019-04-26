'use strict';
module.exports = (sequelize, DataTypes) => {
  const duan = sequelize.define('duan', {
    ten: DataTypes.TEXT,
    mota: DataTypes.TEXT,
    image:DataTypes.TEXT,
    id_user:DataTypes.INTEGER
  }, {});
  duan.associate = function(models) {
    // associations can be defined here
  };
  return duan;
};