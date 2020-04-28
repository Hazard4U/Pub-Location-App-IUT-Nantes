const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const parse = require('csv-parse');

const dbName = 'beerdb.db'; // dbName = ':memory:'; //Pour travailler en mémoirec
//const dbName =  ':memory:';


const createDataBase = ()=> new Promise((resolve, reject)=>{
    const db = new sqlite3.Database(dbName,(err)=>{
        if (err){
            reject(err);
        }
    });
    db.get("PRAGMA foreign_keys = ON");
    console.log(`base de données ${dbName}`);

    resolve(db);
});



const createTable = (db) => new Promise((resolve, reject)=>{
    const sqlCategorie = 'CREATE TABLE IF NOT EXISTS categorie (' +
        'id	INTEGER NOT NULL,' +
        'cat_name TEXT NOT NULL,' +
        'last_mod NUMERIC NOT NULL,'+
        'PRIMARY KEY(id))';
    const sqlStyle = 'CREATE TABLE IF NOT EXISTS style ('+
        'id	INTEGER NOT NULL,' +
        'cat_id INTEGER NOT NULL,' +
        'style_name TEXT NOT NULL,' +
        'last_mod NUMERIC NOT NULL,'+
         'PRIMARY Key(id),'+
         'FOREIGN KEY (cat_id) REFERENCES categorie(id))';
        +')';
    const sqlBrewery = 'CREATE TABLE IF NOT EXISTS brewery ('+
        'id INTEGER NOT NULL,'+
        'breweries TEXT NOT NULL,'+
        'address1 TEXT,'+
        'address2 TEXT,'+
        'city TEXT,' +
        'state TEXT,'+
        'code TEXT,'+
        'country TEXT,'+
        'phone TEXT,'+
        'website TEXT,'+
        'filepath TEXT,'+
        'descript TEXT,'+
        'last_mod NUMERIC NOT NULL,'+
        'coordinates TEXT NOT NULL,'+
        'PRIMARY Key(id))';

    const geoCode = 'CREATE TABLE IF NOT EXISTS geocode ('+
        'id INTEGER NOT NULL,' +
        'brewery_id INTEGER NOT NULL,' +
        'latitude NUMERIC NOT NULL,' +
        'longitude NUMERIC NOT NULL,'+
        'accuracy TEXT NOT NULL,'+
        'coordinates TEXT NOT NULL,'+
        'PRIMARY Key(id),' +
        'FOREIGN KEY (brewery_id) REFERENCES brewery(id))';
    const beer = 'CREATE TABLE IF NOT EXISTS beer ('+
        'name TEXT NOT NULL,'+
        'id  INTEGER NOT NULL,' +
        'brewery_id INTEGER NOT NULL,' +
        'cat_id  INTEGER,' +
        'style_id  INTEGER,' +
        'alcohol_by_volume NUMERIC NOT NULL,'+
        'international_bitterness_units  INTEGER NOT NULL,' +
        'standard_reference_method  INTEGER NOT NULL,' +
        'universal_product_code INTEGER NOT NULL,'+
        'filepath TEXT,'+
        'description TEXT,'+
        'add_user TEXT,'+
        'last_mod NUMERIC NOT NULL,'+
        'style TEXT,'+
        'category TEXT,'+
        'brewer TEXT,'+
        'address TEXT,'+
        'city TEXT,'+
        'state TEXT,'+
        'country TEXT,'+
        'coordinates TEXT,'+
        'website TEXT,'+
        'PRIMARY Key(id),' +
        'FOREIGN KEY (brewery_id) REFERENCES brewery(id),'+
        'FOREIGN KEY (style_id) REFERENCES style(id),'+
        'FOREIGN KEY (cat_id) REFERENCES categorie(id))';


    db.serialize(()=>{
        db.run(sqlCategorie, [], (err)=>{
            if (err){
                reject(err);
            }
            else
                console.log('Categorie créée');
        })
        .run(sqlStyle, [], (err)=>{
            if (err){
                reject(err);
            }
            else
                console.log('Style créée');
        })
        .run(sqlBrewery, [], (err)=>{
            if (err){
                reject(err);
            }
            else
                console.log('Brewery créée');
        })
        .run(geoCode, [], (err)=>{
            if (err){
                reject(err);
            }
            else
                console.log('Geocode créée');
        })
        .run(beer, [], (err)=>{
            if (err){
                reject(err);}
             else {
                console.log("Beer créée");
                resolve(db);}
            })
    });
 });

const populateCategorie = (db) => new Promise((resolve, reject) =>{
    const fileName = './data/open-beer-database-categories.csv';
    const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

    const parser = parse({
        delimiter: ';',
        columns: header =>
            header.map( column => column.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            replace(/[^a-z0-9]/gmi, "_").
            replace(/\s+/g, '_').
            toLowerCase())
    });

    parser.on('readable', function () {
        let row;

        while (row = this.read()) {
            const sqlRequest = "INSERT OR IGNORE into categorie(" +
                "id,cat_name,last_mod) " +
                "VALUES ($id,$catName,$lastMod)";
            const sqlParams = {
                $id: row.id,
                $catName: row.cat_name,
                $lastMod : row.last_mod
            };


            db.run(sqlRequest, sqlParams, function (err) {
                if (err) {
                    console.log("categorie",err,sqlParams,sqlRequest);
                }
            });
        }
    });


    stream.pipe(parser);

    parser.on('finish', function ()  {
        console.log("categorie populate");
        resolve(db);

    });

    parser.on("error", (err) =>{
        console.log(err);
        reject(err);
    });

});

const populateStyle = (db) => new Promise((resolve, reject) =>{
    const fileName = './data/open-beer-database-styles.csv';
    const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

    const parser = parse({
        delimiter: ';',
        columns: header =>
            header.map( column => column.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            replace(/[^a-z0-9]/gmi, "_").
            replace(/\s+/g, '_').
            toLowerCase())
    });

    parser.on('readable', function () {
        let row;

        while (row = this.read()) {
            const sqlRequest = "INSERT OR IGNORE into style(" +
                "id,cat_id,style_name,last_mod) " +
                "VALUES ($id,$catId,$styleName,$lastMod)";
            const sqlParams = {
                $id: row.id,
                $catId: row.cat_id,
                $styleName: row.style_name,
                $lastMod : row.last_mod
            };


            db.run(sqlRequest, sqlParams, function (err) {
                if (err) {
                    console.log("style",err,sqlParams,sqlRequest);

                }
            });
        }
    });


    stream.pipe(parser);

    parser.on('finish', function ()  {
        console.log("style populate");
        resolve(db);

    });

    parser.on("error", (err) =>{
        console.log(err);
        reject(err);
    });

});

const populateBewery = (db) => new Promise((resolve, reject) =>{
    const fileName = './data/open-beer-database-breweries.csv';
    const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

    const parser = parse({
        delimiter: ';',
        columns: header =>
            header.map( column => column.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            replace(/[^a-z0-9]/gmi, "_").
            replace(/\s+/g, '_').
            toLowerCase())
    });

    parser.on('readable', function () {
        let row;

        while (row = this.read()) {
            const sqlRequest = "INSERT OR IGNORE into brewery(" +
                "id,breweries,address1,address2,city,state,code,country,phone,website,filepath,descript,last_mod,coordinates) " +
                "VALUES ($id,$breweries,$address1,$address2,$city,$state,$code,$country,$phone,$website,$filepath,$descript,$lastMod,$coordinates)";

            const sqlParams = {
                $id: row.id,
                $breweries: row.breweries,
                $address1:row.address1,
                $address2: row.address2,
                $city: row.city,
                $state: row.state,
                $code: row.code,
                $country: row.country,
                $phone: row.phone,
                $website: row.website,
                $filepath: row.filepath,
                $descript: row.descript,
                $lastMod: row.last_mod,
                $coordinates: row.coordinates
            };

            db.run(sqlRequest, sqlParams, function (err) {
                if (err) {
                    console.log("brewery",err,sqlParams,sqlRequest);

                }
            });
        }
    });


    stream.pipe(parser);

    parser.on('finish', function ()  {
        console.log("brewery populate");
        resolve(db);

    });

    parser.on("error", (err) =>{
        console.log(err);
        reject(err);
    });

});


const populateGeocode = (db) => new Promise((resolve, reject) =>{
    const fileName = './data/open-beer-database-breweries-geocode.csv';
    const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

    const parser = parse({
        delimiter: ';',
        columns: header =>
            header.map( column => column.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            replace(/[^a-z0-9]/gmi, "_").
            replace(/\s+/g, '_').
            toLowerCase())
    });

    parser.on('readable', function () {
        let row;

        while (row = this.read()) {
            //id;brewery_id;latitude;longitude;accuracy;coordinates
            const sqlRequest = "INSERT OR IGNORE into geocode(" +
                "id,brewery_id,latitude,longitude,accuracy,coordinates) " +
                "VALUES ($id,$breweryId,$latitude,$longitude,$accuracy,$coordinates)";

            const sqlParams = {
                $id: row.id,
                $breweryId: row.brewery_id,
                $latitude:row.latitude,
                $longitude: row.longitude,
                $accuracy: row.accuracy,
                $coordinates: row.coordinates,

            };


            db.run(sqlRequest, sqlParams, function (err) {
                if (err) {
                    console.log("geocode",err,sqlParams,sqlRequest);

                }
            });
        }
    });


    stream.pipe(parser);

    parser.on('finish', function ()  {
        console.log("geocode populate");
        resolve(db);

    });

    parser.on("error", (err) =>{
        console.log(err);
        reject(err);
    });

});


const populateBeer = (db) => new Promise((resolve, reject) =>{
    const fileName = './data/open-beer-database.csv';
    const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

    const parser = parse({
        delimiter: ';',
        columns: header =>
            header.map( column => column.normalize('NFD').
            replace(/[\u0300-\u036f]/g, "").
            replace(/[^a-z0-9]/gmi, "_").
            replace(/\s+/g, '_').
            toLowerCase())
    });

    parser.on('readable', function () {
        let row;

        while (row = this.read()) {
            //id;brewery_id;latitude;longitude;accuracy;coordinates
            const sqlRequest = "INSERT OR IGNORE into beer (" +
                "name,id,brewery_id,cat_id,style_id,alcohol_by_volume,international_bitterness_units,standard_reference_method,universal_product_code,universal_product_code,description,add_user,last_mod,style,category,brewer,address,city,state,country,coordinates,website) " +
                "VALUES ($name,$id,$breweryId,$catId,$styleId,$alcoholByVolume,$internationalBitternessUnits,$standardReferenceMethod,$universalProductCode,$filepath,$description,$addUser,$lastMod,$style,$category,$brewer,$address,$city,$state,$country,$coordinates,$website)";
            if (row.cat_id == -1) row.cat_id=null;
            if (row.style_id == -1) row.style_id=null;

            const sqlParams = {
                $name: row.name,
                $id: row.id,
                $breweryId: row.brewery_id,
                $catId: row.cat_id,
                $styleId: row.style_id,
                $alcoholByVolume: row.alcohol_by_volume,
                $internationalBitternessUnits: row.international_bitterness_units,
                $standardReferenceMethod: row.standard_reference_method,
                $universalProductCode: row.universal_product_code,
                $filepath: row.universal_product_code,
                $description: row.description,
                $addUser: row.add_user,
                $lastMod: row.last_mod,
                $style: row.style,
                $category: row.category,
                $brewer: row.brewer,
                $address: row.address,
                $city: row.city,
                $state: row.state,
                $country: row.country,
                $coordinates: row.coordinates,
                $website: row.website
            };


            db.run(sqlRequest, sqlParams, function (err) {
                if (err) {
                    console.log("beer",err,sqlParams,sqlRequest);

                }
            });
        }
    });


    stream.pipe(parser);

    parser.on('finish', function ()  {
        console.log("beer populate");
        resolve(db);

    });

    parser.on("error", (err) =>{
        console.log(err);
        reject(err);
    });

});


const init =  new Promise((resolve, reject) => {
    createDataBase()
        .then(db => createTable(db))
        .then(db => populateCategorie(db))
        .then(db => populateStyle(db))
        .then(db => populateBewery(db))
        .then(db => populateGeocode(db))
        .then(db => populateBeer(db))
        .then(db => {
            module.exports.db = db;
            resolve(db)});
});



module.exports.init = init;

