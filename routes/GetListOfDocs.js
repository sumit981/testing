var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;
var url =require('../connection');
//var app =require('../index');

router.post('/', function(req, res, next) 
{
	//console.log("a");
	var id = req.body.userid;
	
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("writers_hq");
  
  var query = { User_id: id};
  dbo.collection("Documents").find(query).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    //db.close();
	if(result.length > 0 )
	{
		//console.log(result[0]);
		return res.status(200).json({status: true,resultdata:result});	
	}
	else
	{
		return res.status(200).json({status: false});
	}
  });
});
	
});

module.exports = router;
