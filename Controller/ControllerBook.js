const asyncHandler = require('express-async-handler')
const {Book}= require('../Models/Books')


//  * @desc Get all books
//  * @router /book
//  * @method get
//  * @access puplic
//  */

const AllBooks =  asyncHandler( async(req , res)=>{
  const book =  await Book.find({}).populate("Auther");
  if(book){
   res.status(200).json(book)
  }else{
   res.status(404).json(book)
  }
   
  
 })


 
//  * @desc Get book by id
//  * @router /api/books/:id
//  * @method get
//  * @access puplic
//  */

const GetBookById = asyncHandler( async(req , res)=>{
  const id = req.params.id
  const book = await Book.findById(id).populate("Auther");

  if(book){
    res.status(200).json(book)
  }else{
    res.status(404).json({message : "Not font page ."})
  }
})

//  * @desc Greated New books
//  * @router /api/books
//  * @method Post
//  * @access puplic
//  */
const CreateBook =  asyncHandler(async (req, res) => {
  // إنشاء الكتاب
  const book = new Book({
    title: req.body.title,
    Auther: req.body.Auther,
    description: req.body.description,
    price: req.body.price,
    covery: req.body.covery
  });

  // حفظه في قاعدة البيانات
  const result = await book.save();
  res.status(201).json(result);
})


//  * @desc Update book by id
//  * @router /api/books/:id
//  * @method Put
//  * @access puplic
//  */
const UpdateBook = asyncHandler(async(req , res)=>{

  const book =  await Book.findByIdAndUpdate(req.params.id ,{
    $set : {
      title: req.body.title,
      Auther: req.body.Auther,
      description: req.body.description,
      price: req.body.price,
      covery: req.body.covery

    }
  }, {new : true } )

  if(book){
    res.status(200).json(book)
  }else{
    res.status(404).json({message : "Not font page ."})
  }
})
//  * @desc Delete
//  * @router /api/books/:id
//  * @method delete
//  * @access puplic
//  */
const DeleteBook = asyncHandler(async(req , res)=>{
  const id = req.params.id.trim();
  const book = Book.findById(id);

  if(book){
     await Book.findByIdAndDelete(id);
    res.status(200).json({message : " Delete"})
  }else{
    res.status(404).json({message : "Not font page ."})
  }
})



 module.exports = {
  AllBooks , GetBookById ,CreateBook ,UpdateBook  ,DeleteBook
 }