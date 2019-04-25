'use strict';
module.exports = (sequelize, DataTypes) => {
  const tintuc = sequelize.define('tintuc', {
    ten: DataTypes.TEXT,
    noidung: DataTypes.TEXT,
    id_loaitin: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  tintuc.associate = function (models) {
    // associations can be defined here
  };
  tintuc.check = function (req, res, next) {
    if (req.body.ten && req.body.noidung && req.body.id_loaitin && req.body.image) next();
    else res.json({
      code: 1111,
      message: "Loi tham so"
    })
  }
  return tintuc;
};