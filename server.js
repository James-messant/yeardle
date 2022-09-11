const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();
app.use(cors({origin: '*'}));

app.use(express.static("public"));

//app.set('view engine', 'ejs');

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.listen(process.env.PORT || 3000, () =>{
    console.log("server is running on port 3000.");
  });