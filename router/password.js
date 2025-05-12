const express = require('express');
const router = express.Router();
const { getForgetPassword , sendForgetPasswordlink , getResetPasswordVeiwe , ResetPassword  } = require('../Controller/ControllerPassword');

router.route('/forget-password').get(getForgetPassword)
.post(sendForgetPasswordlink)


///reset password
 router.route('/reset-password/:userId/:token').get(getResetPasswordVeiwe)
.post(ResetPassword)




module.exports = router;