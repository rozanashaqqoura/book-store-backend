const asyncHandler = require("express-async-handler");
const { Cart } = require("../Models/Cart");
const { Book } = require("../Models/Books");

module.exports.getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId })
    .populate({
      path: "books.book",
      select: "title price"
    });

  if (!cart) {
    return res.status(404).json({ message: "No cart found for this user" });
  }

  // ✅ نحسب المجموع وعدد الكتب
  let totalPrice = 0;
  let totalItems = 0;

  const detailedBooks = cart.books.map(item => {
    const price = item.book.price || 0;
    const quantity = item.quantity || 1;

    totalPrice += price * quantity;
    totalItems += 1;

    return {
      title: item.book.title,
      price: price,
      quantity: quantity,
      addedAt: item.addedAt,
      total: price * quantity
    };
  });

  return res.status(200).json({
    message: "✅ Cart details",
    items: detailedBooks,
    totalPrice,
    totalItems
  });
});




// @desc PUT clear cart grom Book 
module.exports.clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.books = []; // تفريغ السلة
  await cart.save();

  res.status(200).json({ message: "✅ Cart cleared", cart });
});




module.exports.addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id; // نستخدم ID من التوكن
  const { bookId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      books: [{ book: bookId, quantity }],
    });
  } else {
    const bookIndex = cart.books.findIndex(
      (item) => item.book.toString() === bookId
    );
    const selectedBook = await Book.findById(bookId); // جيبي الكتاب عشان تاخدي سعره
    if (!selectedBook) {
     return res.status(404).json({ message: "Book not found" });
       }

    if (bookIndex > -1) {
      cart.books[bookIndex].quantity += quantity;
    } else {
      cart.books.push({ book: bookId, quantity, addedAt: new Date(),  priceAtTime: selectedBook.price});
    

    }
  }

  await cart.save();
  res.status(200).json({ message: "✅ Book added to cart", cart });
});


module.exports.updateBookQuantity = asyncHandler(async (req, res) => {
  const userId = req.user.id; // من التوكن
  const { bookId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const bookItem = cart.books.find(
    (item) => item.book.toString() === bookId
  );

  if (!bookItem) {
    return res.status(404).json({ message: "Book not found in cart" });
  }

  bookItem.quantity = quantity; // تعديل الكمية
  await cart.save();

  res.status(200).json({ message: "✅ Quantity updated", cart });
});


exports.removeBookFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id; // نستخدم ID من التوكن
  const { bookId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.books = cart.books.filter(
    (item) => item.book.toString() !== bookId
  );

  await cart.save();

  res.status(200).json({ message: "Book removed from cart", cart });
});



