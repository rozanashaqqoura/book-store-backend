const express = require("express");
const router = express.Router();
const { createOrder ,getMyOrders  } = require("../Controller/orderController");
const { verifyToken } = require("../middlewares/verifyToken");

 router.route("/order").post(verifyToken, createOrder);
 router.route("/my-orders").get(verifyToken, getMyOrders ); // Get all orders for user

module.exports = router;
