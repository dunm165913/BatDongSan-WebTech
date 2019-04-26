const models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const transporter = require('../mail/mail').transporter
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    async getAllUser(req, res) {
        console.log("------------------------Start")
        console.log(req.body);
        await models.user.findAll().then(re => {
            res.json(re)
        }).catch(err => {
            console.log(err)
        })
    },

    async singup(req, res) {
        models.user.create({
            sodienthoai: req.body.sodienthoai,
            matkhau: bcrypt.hashSync(req.body.matkhau),
            email: req.body.email,
            isactive: -1,
            ngaysinh: req.body.ngaysinh ? req.body.ngaysinh : new Date(),
            diachi: req.body.diachi ? req.body.diachi : "",
            role: "user",
            gioitinh: req.body.gioitinh ? req.body.gioitinh : "undefined",
            code: 0

        }).then((result) => {
            res.json({
                coe: 1000,
                message: "ok"
            })
            let option = {

                from: 'Batdongsan.test<no-rep>',
                to: req.body.email,
                subject: "Xac nhan",
                text: "Cảm ơn bạn đã đăng kí dich vụ của chúng tôi, để hoàn thành đăng kí vui lòng xác nhận vào url dưới đây.\n http://127.0.0.1:1000/kichhoat?id=" + result.dataValues.id + "&&username=" + req.body.sodienthoai + "&&code=" + Math.floor(Math.random() * 999999)
            }
            transporter.sendMail(option)
        }).catch(err => {
            console.log(err)
            res.json({
                code: 9999,
                message: "Loi ket noi db"
            })
        })
    },
    async kichhoat(req, res) {
        models.user.findAll({
            where: {
                id: req.query.id,
                sodienthoai: req.query.username
            }
        }).then((re) => {
            console.log(re)
            if (re.length == 0)
                res.json({
                    code: 9999,
                    message: "khong dung tham so"
                })

            else models.user.update({
                isactive: 0
            }, {
                    where: {
                        id: req.query.id
                    }
                }).then((re) => {
                    console.log(re)
                    res.json({
                        code: 1000,
                        message: "ok"
                    })
                })

        }).catch(err => {
            console.log(err)
            res.json({
                code: 9999,
                message: "loi db"
            })
        })
    },
    async login(req, res) {
        await models.user.findAll({
            where: {
                sodienthoai: req.body.sodienthoai
            }
        }).then(re => {

            if (re.length == 0) res.json({
                code: 9999,
                message: "tai khoan khong ton tai"
            })
            else if (bcrypt.compareSync(req.body.matkhau, re[0].dataValues.matkhau)) {
                let token = jwt.sign({
                    id: re[0].dataValues.id,
                    email: re[0].dataValues.email
                },
                    "Batdongsan",
                    {
                        expiresIn: '100h'
                    })
                res.json({
                    code: 1000,
                    message: "ok",
                    data: token
                })
            }
            else res.json({
                code: 9999,
                message: "mk sai"
            })
        }).catch(err => {
            res.json({
                code: 9999,
                message: "loi tham so vao"
            })
        })
    },
    async delete(req, res, next) {
        models.user.findAll({
            where: {
                id: req.body.id_user
            }
        }).then(re => {
            if (re[0]) {
                re[0].destroy()
                next()
            } else {
                res.json({
                    code: 1111,
                    message: "not found"
                })
            }
        })
    },
    async taoma(req, res) {
        let code = 0;
        while (code < 100000 || code > 999999) code = Math.floor(Math.random() * 1000000)
        models.user.update({
            code: code
        }, {
                where: {
                    id: req.userData.id
                }
            }).then(re => {
                res.json({
                    code: 1000,
                    message: "ok"
                })
                let option = {

                    from: 'Batdongsan.test<no-rep>',
                    to: req.userData.email,
                    subject: "Xac nhan",
                    text: "Mã xác nhận của bạn là:" + code
                }
                transporter.sendMail(option)

            })
    },
    async checkma(req, res) {
        models.user.findAll({
            where: {
                id: req.userData.id,
                code: {
                    [Op.and]: {
                        [Op.eq]: req.query.code,
                        [Op.gt]: 10
                    }

                }
            }
        }).then(re => {
            if (re[0]) {
                res.json({
                    code: 1000,
                    message: "ok"
                })
                models.user.update({
                    code: 0
                }, {
                        where: {
                            id: req.userData.id
                        }
                    })
            }
            else res.json({ code: 1111, message: "not found" })
        })
    }

}