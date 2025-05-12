const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        title: String,
        price: Number,
        quantity: Number
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: "pending" // أو "paid" لاحقًا
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
