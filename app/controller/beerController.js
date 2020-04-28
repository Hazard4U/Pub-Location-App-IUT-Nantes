const BeerDAO = require('../dao/beerDAO');
const Beer = require('../model/beer');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class BeerController {

    constructor() {
        this.beerDAO = new BeerDAO();
        this.common = new ControllerCommon();
    }


    findAll(res) {
        this.beerDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        let id = req.params.id;
        this.beerDAO.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findByAlcoholOverDeg(req, res){
        let deg =  req.params.deg;
        this.beerDAO.findByAlcoholOverDeg(deg)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

}


module.exports = BeerController;