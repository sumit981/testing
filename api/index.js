var express = require('express');
var HTTP = require('https');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload'); 
var fs = require('fs');
var path = require('path');



var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url =require('./connection');
var nodemailer    =   require('nodemailer');
var React_Url =require('./FetchReactUrl');




var app = express();

app.use(fileUpload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

var TryFree = require('./routes/TryFree');
app.use('/tryitfree', TryFree);
var SendEmailVerify = require('./routes/SendEmailVerify');
app.use('/sendemailverify', SendEmailVerify);
var GoToDashboard = require('./routes/GoToDashboard');
app.use('/gotodashboard', GoToDashboard);
var UpdateProfile = require('./routes/UpdateProfile');
app.use('/updateprofile', UpdateProfile);
var GetProfileData = require('./routes/GetProfileData');
app.use('/getprofiledata', GetProfileData);
var GetCheckLogin = require('./routes/GetCheckLogin');
app.use('/getchecklogin', GetCheckLogin);
var SaveNewDoc = require('./routes/SaveNewDoc');
app.use('/savenewdoc', SaveNewDoc);
var GetListOfDocs = require('./routes/GetListOfDocs');
app.use('/getlistofdocs', GetListOfDocs);



// getemailverify
app.get('/getemailverify/:insertedidvalue', function(req, res, next) {
  // Handle the get for this route
  //console.log("a");
	var id = req.params.insertedidvalue;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("writers_hq");
	  
	  var myquery = { _id: ObjectID(id)};
      var newvalues = { $set: {Verified: 1} };
      dbo.collection("Users").updateOne(myquery, newvalues, function(err, response) {
      if (err)
	  {
		  throw err;
	  }
	  else 
	  {
		  // db.close();
		  //console.log("1 document updated");
		  //window.location("/Login");
		  return res.redirect(React_Url+'/Dashboard');
          //return res.status(200).json({message: 'verified'});		  
		  
	  }
	  
      });
   });	
});



var httpsServer = HTTP.createServer(app);
httpsServer.listen(5000, function () {
  console.log('App listening on port 5000!')
})

module.exports = app;