import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import User from '../models/UserModel.js'; // your user model

dotenv.config();

const router = express.Router();

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create order API
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 1000, 
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// ✅ Verify payment & update user
router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      await User.findByIdAndUpdate(userId, { isPremium: true });
      res.status(200).json({ success: true, message: 'Payment verified. Premium activated.' });
    } catch (err) {
      res.status(500).json({ success: false, error: 'User update failed' });
    }
  } else {
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
});

export default router;
