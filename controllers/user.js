const models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
    async getAllUser(req, res) {

        console.log("------------------------Start")
        console.log(req.body);

        await models.user.findAll().then(re => {
            res.json(re)
        }).catch(err => {
            console.log(err)
        })
    }

}