
const  { books ,  authors }  = require('./data/data')
const conecctDB = require('./config/db')
const {Book}= require('./Models/Books');
const {Auther}= require('./Models/Authers');
require('dotenv').config();
conecctDB(); // Connect to MongoDB 

//import authors data from data.js
const importauthors = async () => {
  try{
    console.log("🚀 Trying to insert authors..."); // Debug
    await Auther.insertMany(authors);
    console.log('authors imported successfully!');
  }catch(error){
    process.exit(1);
    console.error('Error importing authors:', error);
  }
}

//import  data from data.js
const importBooks = async () => {
  try{
    console.log("🚀 Trying to insert books..."); // Debug
    await Book.insertMany(books);
    console.log('Books imported successfully!');
  }catch(error){
    process.exit(1);
    console.error('Error importing books:', error);
  }
}
//remove books data from MonoDB
const RemoveBooks = async () => {
  try{
    await Book.deleteMany();
    console.log('Books Remove successfully!');
  

  }catch(error){
    console.error('Error Remove books:', error);
    process.exit(1);
  }
}
//remove  authors data from MonoDB
const Removeauthors = async () => {
  try{
    await Auther.deleteMany();
    console.log(' authors Remove successfully!');
  

  }catch(error){
    console.error('Error Remove authors:', error);
    process.exit(1);
  }
}



  if (process.argv[2] === '-import') {
    importBooks();
  } else if (process.argv[2] === '-remove') {
    RemoveBooks();
  };

  if (process.argv[2] === '-import') {
    importauthors();
  } else if (process.argv[2] === '-remove') {
    Removeauthors();
  };





