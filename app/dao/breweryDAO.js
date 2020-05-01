const Brewery = require('../model/brewery');

const daoCommon = require('./commons/daoCommon');
const geolib = require('geolib')
const fs = require('fs');
const parse = require('csv-parse');

class BreweryDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM beer";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const breweries = rows.map(row => new Brewery(row));
                return breweries;
            })
            .catch(err=> console.log(err));
    };

    findById(id) {
        let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
        let sqlParams = {$id: id};
        //console.log(sqlParams);
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
    };

    findInRadius(lat,long,radius){
        return new Promise((resolve,reject) => {
            const fileName = './data/open-beer-database-breweries.csv';
            const stream = fs.createReadStream(fileName, {encoding: 'utf8'});
            let tabOfBreweryInRadius = []

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

                    let check = { 'latitude' : parseFloat(row.coordinates.split(',')[0]) , 'longitude' : parseFloat(row.coordinates.split(',')[1]) }
                    let center = { 'latitude' : lat , 'longitude' : long }
                    console.log(check, center, radius)
                    if (geolib.isPointWithinRadius(check, center, radius)){
                        tabOfBreweryInRadius.push(row);
                    }
                }
            });

            stream.pipe(parser);

            parser.on('finish', function ()  {
                resolve(tabOfBreweryInRadius);
            });

            parser.on("error", (err) =>{
                console.log(err);
                reject(err);
            });})


    }

}

module.exports = BreweryDAO;