const models = require('../models')

module.exports = {

    async getAll(req, res) {
        let  rs=await models.sanpham.findAll({})
        res.json(rs)
    }
}