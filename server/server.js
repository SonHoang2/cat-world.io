const express = require('express');
const bodyParser = require('body-parser');
const catRoutes = require('./routes/catRoutes');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express();
require('dotenv').config()

const baseURL = process.env.baseURL;

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors(({credentials: true, origin: baseURL})));

var PORT = 5000;
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 

app.get('/', (req,res) => res.json('đây là trang chủ'));

app.use(catRoutes);
app.use(authRoutes)
app.use(userRoutes);




