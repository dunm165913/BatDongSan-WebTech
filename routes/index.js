
const controllers=require('../controllers')
const models= require('../models')

const path= require('path')
module.exports=(app)=>{
    app.get('/api/abc',models.user.logined,controllers.user.getAllUser)
    app.get('/api/abcd',controllers.user.getAllUser)
    app.get('/api/sanpham',controllers.sanpham.getAll)

    app.post('/api/dangnhap',models.user.checksingup,controllers.user.singup)
    app.get('/kichhoat',controllers.user.kichhoat)
    app.post('/login',controllers.user.login)
    
    
    
    
    
    app.get('/',(req,res)=>{
        res.render('trangchu')
    })

    app.get('/dangtin',models.user.logined,(req,res)=>{
        res.render('dangraotin')
    })

    app.get('/muathue',(req,res)=>{
        res.render('muathue')
    })
    app.get('/nhadatban',(req,res)=>{
        res.render('nhadatban')
    })
   
}