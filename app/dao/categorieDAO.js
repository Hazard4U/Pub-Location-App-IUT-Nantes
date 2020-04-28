const Categorie = require('../model/categorie');

const daoCommon = require('./commons/daoCommon');

class CategorieDAO {

    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        const sqlRequest = "SELECT * FROM categorie";

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const categories = rows.map(row => new Categorie(row));
                return categories;
            })
            .catch(err=> console.log(err));
    };

    findById(id) {
        let sqlRequest = "SELECT * FROM categorie WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Categorie(row))
    };

    create(categorie) {
        const sqlRequest = "INSERT INTO categorie(" +
            "id,cat_name,last_mod) " +
            "VALUES ($id,$catName,$lastMod)";
        const sqlParams = {
            $id: categorie.id,
            $catName: categorie.catName,
            $lastMod : categorie.lastMod
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    deleteById(id) {
        let sqlRequest = "DELETE FROM categorie WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    update(categorie) {
        let sqlRequest = "UPDATE categorie SET " +
            "cat_name=$catName, " +
            "last_mod=$lastMod " +
            "WHERE id=$id";

        let sqlParams = {
            $catName: categorie.catName,
            $lastMod: categorie.lastMod,
            $id: categorie.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

}

module.exports = CategorieDAO;