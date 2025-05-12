const asyncHandler = require('express-async-handler')
const {User} = require("../Models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");



/**
 * @des Get forget password
 * @router /forget-password
 * @method get
 * @acsess puplice
 */

module.exports.getForgetPassword = asyncHandler( (req, res) => {
  res.render('forget-password'); // يعرض صفحة استعادة كلمة المرور
})

/**
 * @des send forget password
 * @router /forget-password
 * @method POST
 * @acsess puplice
 */

module.exports.sendForgetPasswordlink = asyncHandler(async (req, res) => {
  const { email } = req.body; // استرجاع البريد الإلكتروني من الطلب
  console.log(email)
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).render('forget-password', { message: 'البريد الإلكتروني غير مسجل' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign(
    { email: user.email, id: user.id },
    secret,
    { expiresIn: '10m' }
  );
      const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

      const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, // <== هذا يحل مشكلة self-signed
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Password",
        html: `
    <h3>Click the link below to reset your password:</h3>
    <a href="${link}" target="_blank">${link}</a>
        `,
      };
      transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          res.render("link-sent", { message: "تم إرسال الرابط إلى بريدك الإلكتروني" });
        }
      }) 
 

  
  
  // res.json({ message: "Click on the link", resetPasswordLink: link });
  // هنا يمكنك إرسال الرابط إلى البريد الإلكتروني للمستخدم باستخدام خدمة البريد الإلكتروني
  // //send Email to user with the link
  // res.render('forget-password', { message: 'تم إرسال الرابط إلى بريدك الإلكتروني' });
})

/**
 * @des Get Reset password Link
 * @router /reset-password/:id/:token
 * @method Get
 * @acsess puplice
 */


module.exports.getResetPasswordVeiwe = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render('reset-password', { email : user.email, userId, token: req.params.token });
    
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
  
})


/**
 * @des  Reset password THen update password
 * @router /reset-password/:id/:token
 * @method POST
 * @acsess puplice
 */


module.exports.ResetPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
  
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;
  
    await user.save();
    res.render('password-success');
  } catch (error) {
    console.log(error);
    res.render('password-error');
  }
  
})