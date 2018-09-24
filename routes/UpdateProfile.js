var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url =require('../connection');
//var nodemailer    =   require('nodemailer');
//var url =require('../connection');
var API_URL =require('../FetchUrl');
//var app =require('../index');

router.post('/', function(req, res, next) 
{
	//console.log("a enter");
	   if(req.files){
			//console.log("a file");
            var data = req.files.profileImg.name;  
            // upload user img
            var splitname = data.split('.');
            var time = new Date().getTime() / 1000;
            //var image_name4 = parseInt(time) + "_" + "." + splitname[1];
            //image_name4 = image_name4.trim(' ');
			var image_name4 = req.body.userid + "_" + "." + splitname[1];
            // Use the mv() method to place the file somewhere on your server 
           req.files.profileImg.mv('ProfileImages/' + image_name4, function(err) {

            if (err)
            console.log("error is:" + err); 
            });
        }
        else
        {
         var image_name4 = '';
        }
	var username = req.body.username;
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("writers_hq");
	  
	  var myquery = { _id: ObjectID(req.body.userid)};
	  if(image_name4!="" && username !="")
	  {
		  var newvalues = { $set: {Profile_img: image_name4,Username:username} };
	  }
	  else
	  {
		  var newvalues = { $set: {Username:username} };
	  }
      
      
	  dbo.collection("Users").updateOne(myquery, newvalues, function(err, response) {
      if (err)
	  {
		  throw err;
	  }
	  else 
	  {
		  console.log("profile updated");
		  return res.status(200).json({message: 200});
		  
		  
	  }
	  
      });
});
	
});

module.exports = router;
