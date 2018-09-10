console.log("hello");

const sqlite3 = require('sqlite3').verbose();

// open database in memory
// if use 'xxx' (path to the database file) instead of ':memory:',
// then we connect to a disk file database
// e.g. './db/chinook.db'
let db = new sqlite3.Database('./HMS.db', (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to the HMS database.');
    });

/*
// insert into table
db.serialize(()=>{
    db.run('CREATE TABLE IF NOT EXISTS house(ID integer, Address text, Price real)');
/*
    // insert one row into a table
    db.run(`INSERT INTO house(ID) VALUES(?)`, [1210], function(err){
        if(err){
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // insert multiple rows into a table
    let prices = ['650','533','123','10403'];
    let placeholders = prices.map((price)=>'(?)').join(',');
    let sql = 'INSERT INTO house(Price) VALUES ' + placeholders;

    console.log(sql);

    db.run(sql, prices, function(err){
        if(err){
            return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
    });
}); */

// query from table

db.serialize(()=>{
    //querying all rows with all()
    
    let sql = `SELECT Price price FROM house`;
    db.all(sql, [], (err, rows)=> {
        if(err){
            throw err;
        }
        console.log(rows.length);

        rows.forEach((row)=>{
            console.log(row.price);
        });
        console.log('Now only query one row.');
    });
   

    //querying the first row in the result set
    sql = `SELECT Price price FROM house`;
    let pID = 1;

    // first row only
    db.get(sql, [pID],(err, row)=>{
        if(err){
            return console.error(err.message);
        }
        return row
            ? console.log(row.price)
            : console.log(`No price found with the id ${pID}`);
    });

});


// close the database connection
db.close((err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});