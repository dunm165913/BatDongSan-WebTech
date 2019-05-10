
const controllers = require('../controllers')
const models = require('../models')

const https = require('https')

const path = require('path')
module.exports = (app) => {

    app.get('/api/sanpham/getAll', controllers.sanpham.getAll)
    app.get('/api/sanpham/getnsanpham', controllers.sanpham.getnsanpham)
    app.get('/api/sanpham/getinfor', controllers.sanpham.chitietsanpham)
    app.get('/api/tintuc/getntintuc', controllers.tintuc.getntintuc)
    app.get('/api/tintuc/getinfor', controllers.tintuc.getinfor)
    app.get('/api/duan/getinfor', controllers.duan.getinfor)
    app.get('/api/duan/getnduan', controllers.duan.getnduan)
    app.get('/kichhoat', controllers.user.kichhoat)
    app.get('/api/user/taoma', models.user.logined, controllers.user.taoma)
    app.get('/api/user/checkma', models.user.logined, controllers.user.checkma)


    app.post('/api/user/dangki', models.user.checksingup, controllers.user.singup)
    app.post('/api/user/login', controllers.user.login)
    app.post('/api/user/delete', models.user.logined, models.user.checkadmin, controllers.sanpham.deletebyuser, controllers.duan.deletebyuser, controllers.user.delete)
    app.post('/api/sanpham/dangsanpham', models.user.logined, models.sanpham.check, controllers.sanpham.create)
    app.post('/api/sanpham/deletebyadmin', models.user.logined, models.user.checkadmin, controllers.sanpham.deletemany)
    app.post('/api/sanpham/delete', models.user.logined, models.sanpham.checkuser, controllers.sanpham.delete)
    app.post('/api/tintuc/taotintuc', models.user.logined, models.tintuc.check, controllers.tintuc.create)
    app.post('/api/tintuc/delete', models.user.logined, models.user.checkadmin, controllers.tintuc.delete)
    app.post('/api/duan/taoduan', models.user.logined, controllers.duan.create)
    app.post('/api/duan/delete', models.user.logined, controllers.duan.delete)
    app.post('/api/duan/deletebyadmin',models.user.logined, models.user.checkadmin,controllers.sanpham.deletebyadmin,controllers.duan.deletebyadmin)

    //momo
    app.get('/api/momo/result', controllers.momo.result)
    app.get('/api/momo/thanhtoan', models.user.logined, models.sanpham.checkuser, controllers.momo.thanhtoan);
    app.get('/api/momo/kiemtra', models.user.logined, models.sanpham.checkuser, controllers.momo.kiemtra)


    app.get('/', (req, res) => {
        res.render('trangchu')
    })
    app.get('/dangtin', (req, res) => {
        res.render('dangraotin')
    })

    app.get('/muathue', (req, res) => {
        res.render('muathue')
    })
    app.get('/nhadatban', (req, res) => {
        res.render('nhadatban')
    })

}   