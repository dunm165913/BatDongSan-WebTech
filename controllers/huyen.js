const models = require('../models')

module.exports = {
    async select(req, res) {
        models.huyen.findAll({
            where: {
                id_tinh: req.query.id
            }
        }).then(response=>{
            res.json(response)
        })
    }
}