const models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {
    //lay thong tin ve 1 du an
    async getinfor(req, res) {
        models.duan.findAll({
            where: {
                id: req.query.id
            }
        }).then(re => {
            if (re[0]) res.json({
                code: 1000,
                message: "ok",
                data: re[0]
            })
            else {
                res.json({
                    code: 1111,
                    message: "not found"
                })
            }
        })
    },
    async getnduan(req, res) {
        let id = 1000000000;
        req.query.id ? id = req.query.id : id = id
        models.duan.findAll({
            where: {
                id: {
                    [Op.lt]: id
                }
            },
            attributes: ['id', 'ten', 'image'],
            limit: 10
        }).then(re => {
            res.json({
                code: 1000,
                message: "ok",
                data: re
            })
        })
    },
    async create(req, res) {
        models.duan.create({
            ten: req.body.tem,
            mota: req.body.mota,
            image: req.body.mota,
            id_user: req.userData.id

        }).then(re => {
            res.json({
                code: 1000,
                message: "ok",
                data: re
            })
        })
    },
    async delete(req, res) {
        models.duan.findAll({
            where: {
                id: req.body.id,
                id_user: req.userData.id
            }
        }).then(re => {
            if (re[0]) {
                re[0].destroy();
                res.json({
                    code: 1000,
                    message: "ok"
                })
            } else res.json({
                code: 1111,
                message: "not found"
            })
        })
    },
    async deletebyuser(req, res, next) {
        models.duan.findAll({
            where: {
                id_user: req.body.id
            }
        }).then(re => {
            re.map(x => x.destroy())
            next();
        })
    },
    async deletebyadmin(req, res) {
        models.duan.findAll({
            where: {
                id: req.body.id
            }
        }).then(response => {
            response.map(x => {
                x.destroy()
            })
            res.json({
                code: 1000,
                message: "ok"
            })
        })
    }
}