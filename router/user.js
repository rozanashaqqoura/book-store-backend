const express = require('express');
const router = express.Router();
const {GetAlluser , GetUserById , UpdateUser ,DeleteUser} = require('../Controller/Controlleruser')
const {verifyToken , verifyTokenAndAuthrization , verifyTokenAdmin} = require('../middlewares/verifyToken')


router.get('/user' ,verifyTokenAdmin ,GetAlluser)

// Get User By Id
router.get('/user/:id',verifyTokenAndAuthrization,GetUserById);

//PUT // UPDATA 
router.put('/user/:id' , verifyTokenAndAuthrization ,UpdateUser)

//dedlet User 
router.delete('/user/:id',verifyTokenAndAuthrization,DeleteUser)
module.exports = router;


