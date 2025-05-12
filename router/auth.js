const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Register , Login} = require('../Controller/ControllerAuth')



router.post("/user/register" , Register)

router.get('/register', (req, res) => {
  res.render('register'); // يعرض صفحة التسجيل
});





router.post("/user/login" ,Login)

module.exports = router;


