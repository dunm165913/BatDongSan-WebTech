const models = require('../models/index')
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
            tendangnhap: req.body.tendangnhap,
            matkhau: bcrypt.hashSync(req.body.matkhau),
            email: req.body.email,
            isactive: -1,
            role: "user"

        }).then((result) => {
            res.json({
                coe: 1000,
                message: "ok"
            })
            let option = {

                from: 'Batdongsan.test<no-rep>',
                to: req.body.email,
                subject: "Xac nhan",
                text: "Cảm ơn bạn đã đăng kí dich vụ của chúng tôi, để hoàn thành đăng kí vui lòng xác nhận vào url dưới đây.\n http://127.0.0.1:1000/kichhoat?id=" + result.dataValues.id + "&&username=" + result.dataValues.tendangnhap
            }
            transporter.sendMail(option)
        }).catch(err => {
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
                tendangnhap: req.query.username
            }
        }).then((re) => {
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
        models.user.findAll({
            where: {
                tendangnhap: req.body.tendangnhap
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
    }

}