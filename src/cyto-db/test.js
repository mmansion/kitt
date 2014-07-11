var path   = require('path')
  , fs     = require("fs")
  , file   = path.join(__dirname, "test.db")
  , exists = fs.existsSync(file);


//creates the db file exists = false
if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();

//Returns a new Database object and automatically opens the database. There is no separate method to open the database.
var db = new sqlite3.Database(file, function() {

  console.log("db opened");

  this.serialize(function() {

    if(!exists) {
      db.run("CREATE TABLE Stuff (thing TEXT)");
    }
      
    var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
      
    //Insert random data
    var rnd;

    for (var i = 0; i < 10; i++) {
      rnd = Math.floor(Math.random() * 10000000);
      stmt.run("Thing #" + rnd);
    }
      
    stmt.finalize();
    
    this.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
      console.log(row.id + ": " + row.thing);
    });

    this.close(function() { console.log("db closed"); });

  });

});


