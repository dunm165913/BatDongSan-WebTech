
const crypto = require('crypto');
const https = require('https')


module.exports = {
    async thanhtoan(request, response) {
        console.log(request.query)
        var partnerCode = "MOMOXSGV20190424"
        var accessKey = "mxX5K6WV2FRZxUUs"
        var serectkey = "mI7NugXjCv1egAg73vDKMBRqRt9lTsBi"
        var orderInfo = "pay with MoMo"
        var returnUrl = "http://localhost:1000/api/momo/result"
        var notifyurl = "http://localhost:1000/api/momo/result1"
        var amount = "1000"
        var orderId = request.query.id_sanpham
        var requestId = request.query.id_sanpham
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
            console.log(`Headers: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (body) => {
                console.log('Body');
                console.log(body);
                console.log('payURL');
                response.json(body)
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        // write data to request body
        req.write(body);
        req.end();
    },
}