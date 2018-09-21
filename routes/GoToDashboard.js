var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url =require('../connection');
//var app =require('../index');
//const Cryptr = require('cryptr');
//const cryptr = new Cryptr('myTotalySecretKey');

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';

router.post('/', function(req, res, next) 
{
	//console.log("a");
	var email = req.body.email;
	
	//var encryptedPassword = cryptr.encrypt(password);
	
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("writers_hq");
	
    var query = { Email: email ,Verified:1};
		  dbo.collection("Users").find(query).toArray(function(err, result) {
			if (err) throw err;
			//console.log(result);
			//db.close();
			if(result.length > 0 )
			{
				  var password = req.body.password;
				  var cipher = crypto.createCipher(algorithm,password)
				  var encryptedPassword = cipher.update(password,'utf8','hex')
				  encryptedPassword += cipher.final('hex');

					var query = { Email: email ,Verified:1,Password_hash:encryptedPassword};
					dbo.collection("Users").find(query).toArray(function(errdata, resultdata) {
					  if (errdata)
					  {
						  throw errdata;
					  }
					  else if(resultdata.length > 0 )
					  {
						  return res.status(200).json({status: true,UserId:result[0]._id});
					  }
					  else
					  {
						  return res.status(200).json({status: "notmatched"});
					  }
					  
					  });
					
				
			}
			else
			{
				return res.status(200).json({status: false});
			}
		  });
  
});
	
});

module.exports = router;
