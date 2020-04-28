const CategorieDAO = require('../dao/categorieDAO');
const Categorie = require('../model/categorie');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

class CategorieController {

    constructor() {
        this.categorieDAO = new CategorieDAO();
        this.common = new ControllerCommon();
    }


    findAll(res) {
        this.categorieDAO.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    findById(req, res) {
        let id = req.params.id;
        this.categorieDAO.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    create(req, res) {
        let categorie = new Categorie(req.body);
        return this.categorieDAO.create(categorie)
            .then(() => this.categorieDAO.findById(categorie.id))
            .then((categorie) => {
                res.status(201);
                res.json(categorie);
            })
            .catch(this.common.serverError(res));

    }

    deleteById(req, res) {
        let id = req.params.id;

        this.categorieDAO.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    update(req, res) {
        let categorie = new Categorie();
        /*categorie.id = req.body.id;
        categorie.catName = req.body.catName;
        categorie.lastMod = req.body.lastMod;*/
        categorie = Object.assign(categorie, req.body);


        return this.categorieDAO.update(categorie)
            .then(this.categorieDAO.findById(req.params.id))
            .then(() => this.categorieDAO.findById(categorie.id))
            .then((categorie) => {
                res.status(201);
                res.json(categorie);
            })
            .catch(err => console.log(err));

    };
}


module.exports = CategorieController;