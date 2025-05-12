const express = require('express');
const router = express.Router();
const joi =  require("joi");
const {notfound , errorHandler} = require('../middlewares/error')
const {verifyTokenAdmin} = require('../middlewares/verifyToken')
const {AllBooks ,GetBookById ,CreateBook , UpdateBook , DeleteBook } = require('../Controller/ControllerBook')



router.route("/api/books")
.get(AllBooks)
.post(verifyTokenAdmin,CreateBook)

router.route("/api/books/:id")
.put(verifyTokenAdmin , UpdateBook )
.delete(verifyTokenAdmin , DeleteBook)
//get all Books
// router.get("/api/books" ,AllBooks )

// router.get("/api/books/:id" , GetBookById)



// router.post("/api/books",verifyTokenAdmin,CreateBook);


// router.put("/api/books/:id" ,verifyTokenAdmin , UpdateBook  )


// router.delete("/api/books/:id",verifyTokenAdmin , DeleteBook )



// router.get('/book' , (req , res)=>{

// })
// const books = [
//   {
//     id :  1 , 
//     title : "LandelBook" , 
//     description : " love first love" , 
//     price: 52 , 
//     covery : "softy"
//   }
// ]

// /**
//  * @desc Get all books
//  * @router /book
//  * @method get
//  * @access puplic
//  */

// router.get('/book/api' , (req , res)=>{
//   res.json(books)

// })

// router.get('/abook/api/:id' , (req , res)=>{
//   const book = books.find( b => b.id === parseInt(req.params.id));
//   if(book){
//     res.status(200).json(books)
//   }else{
//     res.status(404).json({messge : " not found"})

//   }


// })

// router.post('/book/api' , (req , res)=>{
//   const book = [{
//     id : books.length +1 ,
//     title: books.body.title,
//     description: books.body.description, 
//     price: books.body.price, 
//     covery: books.body.covery

//   }]

//   books.push(book);
//   res.status(201).json(book)
// })

//validate creat new book
// function validateCreatnewbook(obj){
//   const schema = joi.object({
//     title : joi.string().trim().min(3).max(200).required(),
//     description: joi.string().trim().min(3).max(500).required(),
//     price :joi.number().min(0).required(),
//     covery : joi.string().trim().required()

//   })

//   return schema.validate(obj)
// }
module.exports = router;