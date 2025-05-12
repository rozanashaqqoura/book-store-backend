const { string } = require('joi');
const mongoose = require('mongoose');
const AutherSChema = new mongoose.Schema({
  firstName :{
    type: String,
    required: true ,
    trim :true ,
  },
  lastName :{
    type: String,
    required: true ,
    trim :true ,
  },
  nationality :{
    type: String,
    required: true ,
    trim :true ,
  },
  image : {
    type: String,
    default : "defoult-avater-png"
  }
},{
  timestamps:true
});
// بدنا نعمل Models لل schema
const Auther = mongoose.model("Auther" , AutherSChema);

module.exports = {
  Auther

}