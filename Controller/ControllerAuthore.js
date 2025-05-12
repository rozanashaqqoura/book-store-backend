const {Auther} = require("../Models/Authers")
const asyncHandler = require('express-async-handler')


/**
 * @des get all auther
 * @router /aouther
 * @method get
 * @acsess puplice
 */

const getAllAuther =asyncHandler(async(req , res)=>{
  // res.send("This is my aouther.")
  const NumberPage = req.query;
  const limitpage = 2
  const auther = await Auther.find({}).skip((NumberPage -1)*2).limit(limitpage)
  res.status(200).json(auther)

}) 

/**
 * @des get auther by id 
 * @router /aouther/:id
 * @method get
 * @acsess puplice
 */

const getAutherById =  asyncHandler( async (req , res)=>{
  // res.send("This is my aouther.")
  const auther = await Auther.findById(req.params.id);

  if(auther){
    res.status(200).json(auther)

  }else{
    res.status(404).json({messge : "auther not defined ..!"})
  }

}
)

/**
 * @des new auther
 * @router /aouther
 * @method post
 * @acsess Privet (onley Admine)
 */

const createAuther = async (req , res)=>{
  

  const author = new Auther({
    
    firstName : req.body.firstName,
    lastName: req.body.lastname,
    nationality :req.body.nationality,
    image :req.body.image

  })
 const result = await author.save();
  
  // res.send("This is my aouther.")
  res.status(200).json(result)
}

/**
 * @des get auther by id 
 * @router /aouther/:id
 * @method get
 * @acsess puplice
 */

const  updateAuther =  async (req , res)=>{
  // res.send("This is my aouther.")
  const auther =  await Auther.findByIdAndUpdate(req.params.id , {
    $set : {
      firstName : req.body.firstName ,
      lastName : req.body.lastName ,
      nationality : req.body.nationality ,
      image : req.body.image
    }
  } , {new : true})

  if(auther){
    res.status(200).json(auther)

  }else{
    res.status(404).json({messge : "auther not defined ..!"})
  }
 
}
/**
 * @des get auther by id 
 * @router /aouther/:id
 * @method get
 * @acsess puplice
 */

const deleteAuther = asyncHandler(async (req , res)=>{
  // res.send("This is my aouther.")
  const id = req.params.id.trim();
  const auther = await Auther.findById(id)
  if(auther){
    await Auther.findByIdAndDelete(id);
    res.status(200).json({messge :" Deleted Authore"})

  }else{
    res.status(404).json({messge : "auther not defined ..!"})
  }
 
}) 


module.exports ={
  getAllAuther , getAutherById , createAuther , updateAuther , deleteAuther
}