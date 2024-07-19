const express = require('express');
const crypto = require('crypto');
const axios = require('axios');

const router = express.Router();

// Thông tin từ MoMo Developer (sandbox)
const partnerCode = process.env.MOMO_PARTNER_CODE;
const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;
const ipnUrl = process.env.MOMO_IPN_URL;
const redirectUrl = process.env.MOMO_REDIRECT_URL;
const requestType = 'captureWallet';

// Hàm tạo chữ ký
function generateSignature(requestBody, secretKey) {
    const rawSignature = Object.keys(requestBody)
        .sort()
        .map((key) => `${key}=${requestBody[key]}`)
        .join('&');
    return crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
}
// Endpoint để tạo yêu cầu thanh toán
router.post('/create-payment', async (req, res) => {
    const { amount, orderInfo, orderId } = req.body;
    const requestId = `request_${Date.now()}`;
    const extraData = '';
    const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
    };
    // Tạo chữ ký
    requestBody.signature = generateSignature(requestBody, secretKey);

    try {
        const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
        // Trả về URL mã QR và URL thanh toán cho frontend
        res.json({
            qrCodeUrl: response.data.qrCodeUrl,
            payUrl: response.data.payUrl,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error });
    }
});

// lấy dữ liệu trả về từ MoMo
router.post('/callback', async (req, res) => {
    if (req.body.requestId === 'processed') {
        return res.status(200).end();
    }
    req.body.requestId = 'processed';
    console.log('Callback received:', req.body);
    return res.status(200).json(req.body);
});

// check trạng thái đơn hàng
router.post('/transaction-status', async (req, res) => {
    const { orderId } = req.body;
    if (!orderId || !/^[0-9a-zA-Z]+([-_.:]+[0-9a-zA-Z]+)*$/.test(orderId)) {
        return res.status(400).json({ message: 'Invalid orderId format' });
    }

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    const requestBody = JSON.stringify({
        partnerCode,
        requestId: orderId,
        orderId: orderId,
        signature: signature,
    });
    const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/query',
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    };
    let result = await axios(options);
    return res.status(200).json(result.data);
});

module.exports = router;
