'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    tendangnhap: DataTypes.TEXT,
    matkhau: DataTypes.TEXT,
    email: DataTypes.TEXT,
    dienthoai: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
    role: DataTypes.INTEGER
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  user.logined = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // console.log(token+"----");
      const decoded = jwt.verify(token, "webserver");
      // console.log(decoded);
      req.userData = decoded;
      next();
    } catch (err) { // thao luan xem redirect sang dau ( co the la '/' )
      res.json({
        code:9999,
        message:"Khong xac thuc duoc"
      })
    }
  }
  return user;
};