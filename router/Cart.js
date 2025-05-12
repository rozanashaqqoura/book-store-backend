const express = require("express");
const router = express.Router();
const {
  getUserCart,
  addToCart,
  removeBookFromCart,
  updateBookQuantity ,
  clearCart
} = require("../Controller/CatController");
const { verifyToken } = require("../middlewares/verifyToken");

// @desc Get cart for logged-in user
router.route("/cart").get(verifyToken, getUserCart).post(verifyToken, addToCart);

// @desc Remove specific book from cart
router.delete("/cart/book/:bookId", verifyToken, removeBookFromCart);

//  @des Put Book From Cart 
router.route("/cart/update/:bookId")
.put(verifyToken, updateBookQuantity);
// @desc Clear cart form BOOK
router.route("/cart/clear")
.put(verifyToken, clearCart);


module.exports = router;
