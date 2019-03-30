const userController= require('../controllers').user
const models= require('../models')

const path= require('path')
module.exports=(app)=>{
    app.get('/api/abc',models.user.logined,userController.getAllUser)
    app.get('/api/abcd',userController.getAllUser)
    app.get('/',(req,res)=>{
        res.render('trangchu')
    })
}