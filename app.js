const express = require('express')
const app = express();
const bookrouter = require('./router/book')
const aoutherrouter = require('./router/auther')
const userrouter = require('./router/user')
const authpath = require('./router/auth')
const { notFound, errorHandler } = require('./middlewares/error');
require('dotenv').config(); // تحميل .env
const connectDB = require('./config/db')
const path = require('path');
const helmet = require('helmet');
var cors = require('cors')


const PORT = process.env.PORT  || 3000;;

connectDB(); // Connect to MongoDB


app.use(express.json()); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false })); // لتحويل البيانات من الفورم الى json
app.use(helmet());
app.use(cors())

/// middlewares routes
app.use('/aouther' , aoutherrouter)
app.use('/' ,bookrouter )
app.use('/' , authpath)
app.use('/' , userrouter )
app.use('/' , require('./router/password'))
app.use("/", require("./router/Cart")); // Cart routes
app.use("/", require("./router/orderRoutes")); // Order routes
app.use("/", require("./router/paymentRoutes"));




app.get("/", (req, res) => {
  res.send("Welcome to Book Store Backend");
});


//Error Handlers Middleware
app.use(notFound);
app.use(errorHandler);



// Start Server
app.listen(PORT, ()=>{
  console.log(`open Server ${PORT}`);
})

