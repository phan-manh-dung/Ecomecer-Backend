const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const router = express.Router();

// Thông tin từ MoMo Developer (sandbox)
const partnerCode = process.env.MOMO_PARTNER_CODE;
const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;
const redirectUrl = process.env.MOMO_REDIRECT_URL;
const ipnUrl = process.env.MOMO_IPN_URL;
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
    const { amount, orderInfo } = req.body;
    const orderId = `order_${Date.now()}`;
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
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error });
    }
});

// Endpoint để xử lý thông báo IPN từ MoMo
router.post('/ipn', (req, res) => {
    const { signature, ...body } = req.body;

    // Kiểm tra chữ ký để đảm bảo tính toàn vẹn của thông báo
    const expectedSignature = generateSignature(body, secretKey);

    if (signature === expectedSignature) {
        // Xử lý kết quả thanh toán tại đây
        if (body.resultCode === '0') {
            console.log('Payment successful:', body);
            // Cập nhật trạng thái giao dịch trong hệ thống của bạn
        } else {
            console.log('Payment failed:', body);
        }
        res.status(200).send('OK');
    } else {
        res.status(400).send('Invalid signature');
    }
});

module.exports = router;
