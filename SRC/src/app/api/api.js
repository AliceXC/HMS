const sqlite3 = require('sqlite3').verbose();
/*
// TODO: change to PROMISE
function getPrices() {
    let prices = [];
    let db = new sqlite3.Database('../../database/HMS.db',(err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('Connected to the HMS database.');
    });

    db.serialize(()=>{
        db.all('SELECT * FROM housePrices',[],(err,rows)=>{
            if(err){
               return console.error(err.message);
            }
            prices = rows;
            rows.forEach((row)=>{
                console.log(row);
            });
        });
    });
    
    db.close((err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('The HMS database is closed.');
    });

    return prices;
} */

function getTenants() {
    return new Promise((fulfilled, failed) => {
        openDatabase().then(db => {
            db.all('SELECT * FROM tenants',[],(err,rows)=>{
                if(err){
                    failed(err);
                    return console.error(err.message);
                }
                fulfilled(rows);
                rows.forEach((row)=>{
                    console.log(row);
                });
                db.close();
            });
        });
    });
}

function getHouses(){
    return new Promise((fulfilled,failed) => {
        openDatabase().then(db =>{
            db.all('SELECT * FROM houses',[],(err,rows)=>{
                if(err){
                    failed(err);
                    return console.error(err.message);
                }
                fulfilled(rows);
                rows.forEach((row)=>{
                    console.log(row);
                });
                db.close();
            })
        });
    });
}

function addTenant(a,b){
    return new Promise((fulfilled,failed) => {
        openDatabase().then( db => {
            b = parseInt(b);
            db.run('INSERT INTO tenants(Name,PhoneNumber) VALUES(?,?)', [a,b], (err) =>{
                if(err){
                    return console.error(err.message);
                }
                fulfilled();
            });
            db.close();
        }).catch((error)=>{
            failed(error);
        });
    });
}

function addHouse(a,b){
    return new Promise((fulfilled,failed) => {
        openDatabase().then(db =>{
            b = parseInt(b);
            db.run('INSERT INTO houses(Address,Price) VALUES(?,?)',[a,b], (err) => {
                if(err){
                    return console.error(err.message);
                }
                fulfilled();
            });
            db.close();
        }).catch((error)=>{
            failed(error);
        });
    });
}

function removeTenant(id){
    return new Promise((fulfilled,failed)=>{
        openDatabase().then( db => {
            id = parseInt(id);
            db.run('DELETE FROM tenants WHERE ID = ?',[id],(err)=>{
                if(err){
                    return console.error(err.message);
                }
                fulfilled();
            });
            db.close();
        }).catch((error)=>{
            failed(error);
        });
    });
}

function removeHouse(id){
    return new Promise((fulfilled,failed)=>{
        openDatabase().then(db=>{
            id = parseInt(id);
            db.run('DELETE FROM houses WHERE ID = ?',[id],(err)=>{
                if(err){
                    return console.error(err.message);
                }
                fulfilled();
            });
            db.close();
        }).catch((error)=>{
            failed(error);
        });
    });
}

function getLastTenant(){
    return new Promise((fulfilled,failed)=>{
        openDatabase().then( db=>{
            db.run('SELECT * FROM tenants WHERE ID = (SELECT MAX(ID) FROM tenants)', [], (err,row)=>{
                if(err){
                    failed(error);
                }
                fulfilled(row);
            });
            db.close();
        });
    });
}

// TODO: given a tenant's id, search all houses that he occupies
function searchHouses(){
    const sqlite3 = require('sqlite3').verbose();
    let houses = [];

    let db = new sqlite3.Database('../../database/HMS.db',(err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('Connected to the HMS database.');
    });

    //--------------------------------------------------------TODO

    db.close((err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log('The HMS database is closed.');
    });
    return houses;
}

function openDatabase() {

    return new Promise((fulfilled, failed) => {
        let db = new sqlite3.Database('../../database/HMS.db',(err)=>{
            if(err){
                failed(error);
                return console.error("failed to open database");
            }
            console.log('Connected to the HMS database.');
            fulfilled(db);
        });
    });
}


module.exports.getHouses = getHouses;
// module.exports.getPrices = getPrices;
module.exports.addHouse = addHouse;
module.exports.removeHouse = removeHouse;

module.exports.getTenants = getTenants;
module.exports.addTenant = addTenant;
module.exports.getLastTenant = getLastTenant;
module.exports.removeTenant = removeTenant;

module.exports.searchHouses = searchHouses;
module.exports.openDatabase = openDatabase;