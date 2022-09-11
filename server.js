const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();
app.use(express.static("public"));


app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

//app.set('view engine', 'ejs');

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

  app.listen(process.env.PORT || 3000, () =>{
    console.log("server is running on port 3000.");
  });