
const crypto = require('crypto');
const https = require('https')
const models = require('../models')
const transporter = require('../mail/mail').transporter
const sequelize = require('sequelize')

function kiemtra(request, response, option) {
    console.log(request.query.id)
    var partnerCode = "MOMOXSGV20190424"
    var accessKey = "mxX5K6WV2FRZxUUs"
    var serectkey = "mI7NugXjCv1egAg73vDKMBRqRt9lTsBi"
    var orderId = request.query.id
    var requestId = request.query.id
    var requestType = 'transactionStatus'
    var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&orderId=" + orderId + "&requestType=" + requestType
    var signature = crypto.createHmac('sha256', serectkey)
        .update(rawSignature)
        .digest('hex');
    var body = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        orderId: orderId,
        requestType: requestType,
        signature: signature,
    })
    var options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/gw_payment/transactionProcessor',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    console.log("Sending....")

    var req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        let d = ''
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            d = d + body;
            // console.log(body + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>" + d)
            // // let r=JSON.parse(body.replace(/\n/g,''))
            if (d[d.length - 1] == '}') {
                d = JSON.parse(d)
                if (!option) {
                    response.json({
                        code: 1000,
                        data: {
                            errorCode: d.errorCode,
                            id_sanpham: d.orderId,
                            message: d.message
                        }
                    })
                }
                else {
                    response.redirect('/')
                }

                if (d.errorCode == 0) {
                    models.sanpham.update({
                        trangthai: "Yes"
                    }, {
                            where: {
                                id: d.orderId,
                                trangthai: "No"
                            }
                        }).then(re => {
                            console.log("---------------------" + re)
                            if (re == 1) {

                                models.sequelize.query("Select email from users,sanphams where users.id=sanphams.id_user and sanphams.id=:id",
                                    { replacements: { id: [request.query.id] }, type: sequelize.QueryTypes.SELECT }).then(re => {
                                        let option = {

                                            from: 'Batdongsan.test<no-rep>',
                                            to: re[0].email,
                                            subject: "Thong bao",
                                            text: "ban da thanh toan cho san pham voi id=" + request.query.id + "\nCam on ban!"
                                        }
                                        transporter.sendMail(option)
                                    })

                            }
                        })
                }
            }
        });
        res.on('end', () => {
            console.log('No more data in response.');

        });
    });
    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        response.json({
            code: 2222,
            data: {
                message: "loi ket noi momo"
            }
        })
    });

    // write data to request body
    req.write(body);
    req.end();
}
module.exports = {
    async thanhtoan(request, response) {
        request.query.id = request.body.id.toString()
        console.log(request.query)
        var partnerCode = "MOMOXSGV20190424"
        var accessKey = "mxX5K6WV2FRZxUUs"
        var serectkey = "mI7NugXjCv1egAg73vDKMBRqRt9lTsBi"
        var orderInfo = "pay with MoMo"
        var returnUrl = "http://localhost:1000/api/momo/result"
        var notifyurl = "http://localhost:1000/api/momo/result1"
        var amount = "1000"
        var orderId = "a" + Math.floor(Math.random() * 11111111)
        var requestId = request.query.id
        var requestType = "captureMoMoWallet"
        var extraData = "merchantName=;merchantId="
        var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
        var signature = crypto.createHmac('sha256', serectkey)
            .update(rawSignature)
            .digest('hex');
        var body = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyurl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
        })
        var options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/gw_payment/transactionProcessor',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };
        console.log("Sending....")
        var req = https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            let d = '';
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (body) => {
                d = d + body;
                // console.log(body + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>" + d)
                // // let r=JSON.parse(body.replace(/\n/g,''))
                if (d[d.length - 1] == '}') {
                    d = JSON.parse(d)
                    console.log(d)
                    console.log(typeof (d))


                }



            });
            res.on('end', () => {
                response.json({
                    code: d.errorCode === 0 ? 1000 : 1111,
                    data: {
                        url: d.payUrl,
                        errorCode: d.errorCode,
                        message: d.message
                    }
                })
                console.log('No more data in response.');
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            response.json({
                code: 2222,
                data: {
                    message: "loi ket noi momo"
                }
            })
        });

        // write data to request body
        req.write(body);
        req.end();
    },
    async kiemtra(request, response) {
        await kiemtra(request, response, false)
    },
    async result(req, res) {
        // console.log(req)
        if (req.query.orderId) {
            if (req.query.errorCode == 0) {
                //update trang thai
                req.query.id = req.query.orderId
                await kiemtra(req, res, true);
            } else {
                res.json({
                    code: 9999,
                    data: {
                        error: req.query.errorCode,
                        message: req.query.message
                    }
                })
            }
        }
        else {
            res.json({
                code: 9999,
                message: "sai thong so"
            })
        }
    }
}