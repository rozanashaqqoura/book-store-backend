// const jwt = require( 'jsonwebtoken');

// function verifyToken(req, res, next) {
//   const token = req.headers.token;
//   if(token){
//     try{
//       const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
//       req.user = decoded; // نمرر الداتا للريكوست
//       next();

//     }catch(err){
//       return res.status(401).json({message : "Invalid token"})
//     }


//   }else{
//     return res.status(401).json({message : "Not token provided"})
//   }
// }

// function verifyTokenAndAuthrization(req, res  , next) {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       return res.status(403).json({ message: "You are not allowed to do that!" });
//     }
//   });
// }
// function verifyTokenAdmin(req , res , next){
// console.log("🪙 TOKEN:", token);
//   verifyToken(req , res , ()=>{
//     if(req.user.isAdmin){
//       next()
//     }else{
//       return res.status(403).json({message : "You are not allowed to do that Ainly Admin !"})
//     }
//   })

// }
// module.exports = {verifyToken , verifyTokenAndAuthrization , verifyTokenAdmin} ;
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
}

function verifyTokenAndAuthrization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
}

function verifyTokenAdmin(req, res, next) {
  verifyToken(req, res, () => {
    console.log("👤 Admin Check:", req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not allowed to do that Ainly Admin!" });
    }
  });
}

module.exports = { verifyToken, verifyTokenAndAuthrization, verifyTokenAdmin };
