const BreweryDAO = require('../dao/breweryDAO');
const Brewery = require('../model/brewery');


/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class BreweryController {

    constructor() {
        this.breweryDAO = new BreweryDAO();
        this.common = new ControllerCommon();
    }


    findAll(res) {
        this.breweryDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        let id = req.params.id;
        this.breweryDAO.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findInRadius(req, res){
        console.log('test')
        let lat = req.query.lat;
        let long = req.query.long;
        let radius = req.query.radius;
        this.breweryDAO.findInRadius(lat,long,radius)
            .then((data)=>{
                res.status(200); // Found
                res.json(data)})
            .catch(this.common.findError(res));
    }

}

module.exports = BreweryController;