const mongoose = require('mongoose');

const cartschema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      },
      priceAtTime: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartschema);
module.exports = { Cart };
