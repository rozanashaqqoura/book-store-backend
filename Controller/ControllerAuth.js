const asyncHandler = require('express-async-handler')
const {User} = require("../Models/User")
const bcrypt = require('bcryptjs');




/**
 * @des  Register
 * @router /user/register
 * @method POST
 * @acsess puplice
 */
const Register = asyncHandler( async(req , res)=>{

  // بس نعمل مستخدم جديد لازم نتاكد من الايميل موجود ولا لاء في قاعدة البيانات 
  const user = await User.findOne({email : req.body.email})

  if(user){
   return  res.status(400).json({messge : "alredy i have this Email in Data."})
  
  }

   // 2. نعمل هاش للباسورد
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

     // 3. نعمل مستخدم جديد
  const newUser =  new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin || false
  });
  // بنحفظه في قاعدة البيانات
 const result =  await newUser.save()
  res.status(201).json(result)
})



/**
 * @des  Log in
 * @router /user/login
 * @method POST
 * @acsess puplice
 */


const Login =  asyncHandler( async(req , res)=>{

  // هنا المستخد مسجل ومخلص بدنا نتاكد من وجود الايميل وكلمة السر تكون متشابه مش نشفرها
 
   const user = await User.findOne({email : req.body.email})
 
   if(!user){
    return  res.status(400).json({messge : "Invlad You Email"})
   
   }
 // 2. نقارن الباسورد المدخلة مع الباسورد المخزنة (المشفرة)
   const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
 
    
   if (!isPasswordMatch) {
     return res.status(401).json({ message: "this is passwordword not Match"});
   }
   
   const token = user.generateToken(); // هنا بنعمل توكن للمستخدم
   const  {password , ...other} = user._doc
  
 
 
   res.status(201).json({ ...other,token})
 })






module.exports = {
  Register ,Login
}