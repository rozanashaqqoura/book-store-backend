// Routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../Controller/paymentController");
const { verifyToken } = require("../middlewares/verifyToken");

// ✅ إنشاء جلسة Stripe Checkout
router.route("/create-checkout-session")
.post(verifyToken, createCheckoutSession);

module.exports = router;
