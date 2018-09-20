var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://sahil:sahil12345@ds149252.mlab.com:49252/writers_hq";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database Connected!");
  //db.close();
});

module.exports = url;