var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url =require('../connection');
//var nodemailer    =   require('nodemailer');
var url =require('../connection');
var API_URL =require('../FetchUrl');
//var app =require('../index');
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('myTotalySecretKey');

//var crypto = require('crypto');
//var algorithm = 'aes-256-ctr';

router.post('/', function(req, res, next) 
{
	//console.log("a");
	var userid = req.body.userid;
	var created_date = req.body.created_date;
	var modified_date = req.body.modified_date;
	var words = req.body.words;
	var title = req.body.title;
	var body = req.body.body;
	var publicdoc = req.body.publicdoc;
	
	//var password = req.body.password;
	//var cipher = crypto.createCipher(algorithm,password)
    //var encryptedPassword = cipher.update(password,'utf8','hex')
    //encryptedPassword += cipher.final('hex');
	//var encryptedPassword = cryptr.encrypt(password);
	
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("writers_hq");
      var myobj = {User_id:userid, Created: created_date, Last_modified : modified_date,Words:words,Title: title,Body:body,Public:publicdoc};
      dbo.collection("Documents").insertOne(myobj, function(err, response) {
      if (err)
	  {
		  throw err;
	  }
	  else 
	  {
		  // db.close();
		  console.log("1 document inserted");
		  return res.status(200).json({status: true,UserId:myobj._id});
		 
	  }
	  
      });
});
	
});

module.exports = router;
