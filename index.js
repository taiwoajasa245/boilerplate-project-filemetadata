var express = require('express');
var cors = require('cors');
require('dotenv').config(); 

// multer
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static('public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // to help get the post request from the index.js


// routes 

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const fileUpload = upload.single('upfile'); 

app.post('/api/fileanalyse', fileUpload,  (req, res, next) => {
  const upfile  = req.file; 

  res.status(200).json({ 
    name: upfile.originalname, 
    type: upfile.mimetype, 
    size: upfile.size
  }); 


  next(); 
}); 



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
