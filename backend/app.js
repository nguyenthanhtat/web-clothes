const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// link router
const customer = require('./Routes/userRoute.js');
app.use('/api/auth/customer',customer)
//admin
const admin = require('./Routes/adminRouter');
//Authenticate admin
app.use('/api/auth/admin', admin);
// product
const products = require('./Routes/productRoute.js');
app.use('/api/products',products)
// cart
const carts = require('./Routes/cartRoute.js');
app.use('/api/carts',carts)
// order
const orders = require('./Routes/orderRoute.js');
app.use('/api/orders',orders)

const categories = require('./Routes/categoryRoute.js');
app.use('/api/categories',categories)
//Upload
const upload = require('./Routes/UploadCloud.js');
app.use('/api', upload);
app.use(express.static(path.join(__dirname, '')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,''));
})
module.exports = app;