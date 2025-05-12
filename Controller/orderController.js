const asyncHandler = require("express-async-handler");
const { Cart } = require("../Models/Cart");
const { Order } = require("../Models/Order");

// @desc GET all orders for user
module.exports.getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 }) // الأحدث أولًا
    .populate({
      path: "items.book",
      select: "title"
    });

  res.status(200).json({
    message: "✅ My Orders",
    orders
  });
});

module.exports.createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "books.book",
    select: "title price"
  });

  if (!cart || cart.books.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.books.map(item => ({
    book: item.book._id,
    title: item.book.title,
    price: item.book.price,
    quantity: item.quantity
  }));

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const order = await Order.create({
    user: userId,
    items,
    totalPrice,
    status: "pending"
  });

  // إفراغ السلة بعد إنشاء الطلب
  cart.books = [];
  await cart.save();

  res.status(201).json({
    message: "✅ Order created successfully",
    order
  });
});
