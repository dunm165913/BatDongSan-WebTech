'use strict';
const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    tendangnhap: DataTypes.TEXT,
    matkhau: DataTypes.TEXT,
    email: DataTypes.TEXT,
    sodienthoai: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    ngaysinh: DataTypes.DATE,
    diachi: DataTypes.TEXT,
    gioitinh: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
    role: DataTypes.TEXT,
    code: DataTypes.TEXT
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  user.logined = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, "Batdongsan");
      req.userData = decoded;
      next();
    } catch (err) {
      console.log(err)
      res.json({
        code: 9999,
        message: "Khong xac thuc duoc"
      })
    }
  }
  user.checksingup = async (req, res, next) => {
    try {
      if (req.body.matkhau.length < 6) {
        res.json({
          code: 9999,
          message: "Mat khau ngan"
        })
      }
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(req.body.email.toLowerCase())) { }
      else res.json({
        code: 9999,
        message: "email khong hop le"
      })

      let user = await sequelize.query('select * from users where email = :email',
        { replacements: { email: [req.body.email] }, type: sequelize.QueryTypes.SELECT })
      if (user.length == 0) next();
      else res.json({
        code: 9999,
        message: "email da dc su dung"
      })
    }
    catch (err) {
      res.json({
        code: 9999,
        message: "Loi tham so truyen vao"
      })
    }

  },
    user.checkadmin = function (req, res, next) {

      try {
        if (req.userData.role == "admin") next();
        else res.json({
          code: 1111,
          message: "not admin"
        })
      } catch (err) {
        res.json({
          code: 1111,
          message: "not admin"
        })
      }
    }
  return user;
};