const express = require('express');
const bodyParser = require('body-parser');
const catRoutes = require('./routes/catRoutes');
const authRoutes = require('./routes/authRoutes')
var cookieParser = require("cookie-parser");
const {requireAuth} = require('./middleware/authMiddleware')
const cors = require('cors')
const app = express();

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//view engine
app.set('view engine', 'ejs');

var PORT = 5000;
app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 

app.use(catRoutes);
app.use(authRoutes)
