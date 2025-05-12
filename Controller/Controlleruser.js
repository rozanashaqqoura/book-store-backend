const {User} = require("../Models/User")// model user
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');


//  * @des Get  All User 
//  * @router /user
//  * @method Get
//  * @acsess privet
//  */

const GetAlluser =  asyncHandler(async (req , res)=>{
  const users = await User.find({}).select("-password") // نعمل استبعاد 
  res.status(200).json({users})
})

/**
 * @des Get  auther By ID
 * @router /user/:id
 * @method Get
 * @acsess puplice
 */

const GetUserById =  asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); // نمرر id من params
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ user });
})

/**
 * @des Edite && updata
 * @router /user/:id
 * @method PUT
 * @acsess puplice
 */
const UpdateUser =  asyncHandler(async (req , res)=>{

  console.log(req.headers)
  let hashedPassword;
  if(req.body.password){
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  }
 const UPDATA = await User.findByIdAndUpdate(req.params.id , {
  $set : {
    username : req.body.username,
    email : req.body.email ,
    password : hashedPassword
  }

 } , {new : true}).select("-password")


  
res.status(201).json({UPDATA})

})

/**
 * @des Delete
 * @router /user/:id
 * @method Delette
 * @acsess puplice
 */
const DeleteUser =   asyncHandler(async (req , res)=>{
  const id = req.params.id.trim()
 const DeletUser = await User.findById(id)
  if(DeletUser){
     await User.findByIdAndDelete(id);
    res.status(200).json({message : " Delete"})
  }else{
    res.status(404).json({message : "Not font page ."})
  }
 
})
     

module.exports = {
  GetAlluser ,GetUserById , UpdateUser , DeleteUser

};