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
        const sqlRequest = "SELECT * FROM brewery";

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
        // const request = "SELECT * FROM brewery";
        return new Promise((resolve, reject) => {
            const brew = this.findAll()
                .then((breweries) => {
                    const tabOfBreweryInRadius =  breweries.filter((brewery,index) => {
                        let check = { 'latitude' : parseFloat(brewery.coordinates.split(',')[0]) , 'longitude' : parseFloat(brewery.coordinates.split(',')[1]) }
                        let center = { 'latitude' : lat , 'longitude' : long }
                        return geolib.isPointWithinRadius(check, center, radius)
                    })
                    resolve(tabOfBreweryInRadius);
                })
                .catch(err=> console.log(err));

        })
    };
}

module.exports = BreweryDAO;