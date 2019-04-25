const models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
module.exports = {

    async getAll(req, res) {
        let rs = await models.sanpham.findAll({})
        res.json(rs)
    },
    async create(req, res) {
        let request = req.body
        await models.sanpham.create({
            tensp: request.tensp,
            ngaydang: new Date(),
            dientich: request.dientich,
            gia: request.gia,
            mota_soluoc: request.mota_soluoc,
            trangthai: request.trangthai,
            id_loaisp: request.id_loaisp ? request.id_loaisp : 1,
            id_tinh: request.id_tinh ? request.id_tinh : 1,
            id_huyen: request.id_huyen ? request.id_huyen : 1,
            diachi: request.diachi ? request.diachi : '',
            id_duan: request.id_duan ? id_duan : 1,
            id_vitri: request.id_vitri ? request.id_vitri : 1,
            id_user: req.userData.id,
            chieudai: request.chieudai ? request.chieudai : 1,
            chieungang: req.chieungang ? request.chieungang : 1,
            loaidat: request.loaidat ? request.loaidat : "",
            // phongnhu: request.phongnhu ? request.phongnhu : 0,
            // phongan: request.phongan ? request.phongan : 0,
            image: request.image,
        }).then(re => {
            res.json(re)
        }).catch(err => {
            res.json({
                mes: "loi"
            })
        });


    },
    async chitietsanpham(req, res) {
        let resu = await models.sanpham.findAll({
            where: {
                id: req.query.id
            }
        });
        res.json(resu)
    },
    //lay thongt tin co ban cua n du an
    async getnsanpham(req, res) {
        let id = 10000000;
        req.body.id ? id = req.body.id : id = id

        let resu = await models.sanpham.findAll({
            where: {
                id: {
                    [Op.lt]: id
                }
            },
            order: [['id', 'DESC']],
            attributes: ['id', 'image', 'tensp', 'gia', 'dientich'],
            limit: 10,
        })
        res.json(resu)
    },
    //xoa bai dang
    async delete(req, res) {
        models.sanpham.findAll({
            where: {
                id: req.body.id
            }
        }).then(re => {
            if (re[0]) {
                re[0].destroy();
                res.json({
                    code: 1000,
                    message: "ok"
                })
            }
            else {
                res.json({
                    code: 111,
                    message: "Not found "
                })
            }
        })

    },
    // xoa n san pham
    async deletemany(req, res) {
        models.sanpham.findAll({
            where: {
                id: {
                    [Op.or]: req.body.manyid
                }
            }
        }).then(re => {
            re.map(x => x.destroy())
            res.json({
                code: 1000,
                message: "ok"
            })
        })
    },
    async deletebyuser(req, res) {
        models.sanpham.findAll({
            where: {
                id_user: req.body.id_user
            }
        }).then(re => {
            re.map(x => x.destroy())
            res.json({
                code: 1000,
                messageL: "ok"
            })
        })
    }

}