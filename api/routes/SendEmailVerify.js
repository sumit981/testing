var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url =require('../connection');
var nodemailer    =   require('nodemailer');
var url =require('../connection');
var API_URL =require('../FetchUrl');
//var app =require('../index');
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('myTotalySecretKey');

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';

router.post('/', function(req, res, next) 
{
	//console.log("a");
	var email = req.body.email;
	var password = req.body.password;
	var cipher = crypto.createCipher(algorithm,password)
    var encryptedPassword = cipher.update(password,'utf8','hex')
    encryptedPassword += cipher.final('hex');
	//var encryptedPassword = cryptr.encrypt(password);
	
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("writers_hq");
      var myobj = {Username:'', Email: email, Points : null,Verified:0,Active: 1,Password_hash:encryptedPassword,Created:null,Reminders: 1,Words_goal:300,Words_today:null,Profile_img:null};
      dbo.collection("Users").insertOne(myobj, function(err, response) {
      if (err)
	  {
		  throw err;
	  }
	  else 
	  {
		  // db.close();
		  console.log("1 document inserted");
		  var transporter = nodemailer.createTransport({
			 service: 'gmail',
			 auth: {
			 user: 'testingreactdb@gmail.com',
			 pass: 'testingreactdb12345'
			 }
		 });
		 var mailOptions = {
		  from: 'testingreactdb@gmail.com',
		  to: email,
		  subject: 'Email Verification Testing Purpose',
		  html: 'Greetings !! <br><br> Please click on the following to verify your account.<br><br><b>Link :</b><a href="'+ API_URL+'/getemailverify'+'/'+myobj._id +'">Verification Link</a><br><br> Thanks.'
		};
	
		  transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
				console.log(error);
			  } else {
				console.log('Email sent: ' + info.response);
				//console.log(myobj._id);
				//return res.status(200).json({message: 'send'});
				return res.status(200).json({message: 'send',UserId:myobj._id});
			  }
			  
		  });
		 
	  }
	  
      });
});
	
});

module.exports = router;
