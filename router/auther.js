const express = require('express');
const router = express.Router();
const joi =  require("joi")
const {verifyTokenAdmin} = require('../middlewares/verifyToken')
const {getAllAuther ,getAutherById ,createAuther , updateAuther , deleteAuther} = require('../Controller/ControllerAuthore')



router.get("/aouther" ,getAllAuther )

router.get("/aouther/:id"  ,getAutherById)

router.post("/aouther" ,verifyTokenAdmin,createAuther)

router.put("/aouther/:id", verifyTokenAdmin ,updateAuther)

router.delete("/aouther/:id",verifyTokenAdmin , deleteAuther )

module.exports = router