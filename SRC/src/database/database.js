const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./HMS.db', (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Connected to the HMS database.');
});

db.serialize(()=>{
    db.run('CREATE TABLE IF NOT EXISTS tenants(ID integer primary key, Name text not null, PhoneNumber integer not null)');
    db.run('CREATE TABLE IF NOT EXISTS houses(ID integer primary key, Address text, Price real)');
    db.run('CREATE TABLE IF NOT EXISTS occupy(TenantID integer, HouseID integer)');
    db.run('CREATE TABLE IF NOT EXISTS contain(HouseID integer, HousePriceID integer)');
    db.run('CREATE TABLE IF NOT EXISTS housePrices(ID integer primary key, Price real, StartDate text, EndDate text)');
    /*
    // insert one house
    db.run(`INSERT INTO houses(Address, Price) VALUES(?,?,?)`, ['350 Prince Arthur', 1325.00],(err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('A row has been inserted into houses.');
    });

    // insert two tenants
    db.run('INSERT INTO tenants(Name,PhoneNumber) VALUES("Arthur",5146063365),("Yihan", 5143493934)', [], (err)=>{
        if(err){
            return console.error(err.message);
        }
    
        console.log('Two rows has been inserted into tenants.');
    });

    // insert two occupies
    db.run('INSERT INTO occupy VALUES(1,1),(2,1)',[], (err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('Two occupies has been inserted into the table occupy.');
    });

    db.run('DELETE FROM tenants WHERE ID = ?',[3],(err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log("tenant deleted!");
    });*/

});

db.close((err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log('Close the HMS database.');
});

function addHouse(a,b,db){
    db.run('INSERT INTO houses(Address, Price) VALUES(?,?)',
            [a,b], (err,row)=>{
                if (err) {
                    console.error(err.message);
                }
                console.log(`A house has been added`); //: Address-${a}, Price-${b}`);
            });

    // TEST print the last row which was just added
    db.run('SELECT * FROM houses WHERE ID = (SELECT MAX(ID) FROM houses', [], (err,row)=>{
        if(err){
            throw err;
        }
        console.log(row);
    });
}