// Controllers/paymentController.js
const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Cart } = require("../Models/Cart");
const { Book } = require("../Models/Books");

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate("books.book");

  if (!cart || cart.books.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const line_items = cart.books.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.book.title,
      },
      unit_amount: item.book.price * 100, // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.status(200).json({ url: session.url });
});
