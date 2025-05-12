const mongoose = require('mongoose');
const BookSChema = new mongoose.Schema({
  title :{
    type: String,
    required: true ,
    trim :true ,
  },
  Auther :{
  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auther',
    
  }
  ,
  description : {
    type: String,
    required: true ,
    trim :true ,
    
  },
  price : { type: Number, required: true },
  covery :{
    type: String,
    required: true ,
    trim :true ,

  }

} , {
  timestamps:true
});

const Book = mongoose.model("Book" ,BookSChema );

module.exports = {
  Book
}
  