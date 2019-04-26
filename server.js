const Express = require('express');
const app = Express();
const models = require('./models');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.use(Express.static(__dirname + '/public'));

setInterval(() => {
    models.sanpham.findAll({
        where: {

            [Op.or]: [
                {
                    trangthai: "Yes",
                    createdAt: {
                        [Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 30)
                    }
                }, {
                    trangthai: "No",
                }
            ]
        }
    }).then(re => {
        re.map(x => x.destroy())
    })
}, 24 * 60 * 60 * 1000);


models.sequelize.sync().then(() => {
    console.log("fine")
}).catch((err) => {
    console.log(err)
})

require('./routes')(app);



app.listen(1000, () => {
    console.log("server is starting at 1000 ")
})

module.exports = app