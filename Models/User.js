
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  isAdmin:{
    type : Boolean ,
    default : false

  },

  username: {
    type: String,
    required: true, // إلزامي
    unique: true, // اسم المستخدم يجب أن يكون فريد
    trim: true, // إزالة المسافات قبل وبعد الاسم
  },
  email: {
    type: String,
    required: true, // إلزامي
    unique: true, // البريد الإلكتروني يجب أن يكون فريد
    lowercase: true, // تحويل البريد إلى حروف صغيرة تلقائيًا
  },
  password: {
    type: String,
    required: true, // إلزامي
    minlength: 6, // الحد الأدنى لطول كلمة المرور
  }
  
} , {timestamps : true});
 

//Generate Token
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d'
  });
  return token;
};

// هنا بنعمل موديل للمستخدم باستخدام السكيمة
const User = mongoose.model('User', userSchema);

module.exports ={User};
