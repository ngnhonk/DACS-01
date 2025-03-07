const db = require('../config/database');

module.exports.getAllCategories = async (req, res) => {
    let categories = db('categories').select('*');
    return categories;
}

module.exports.getOneCategory = async (req, res) => {
    let category = db('categories').select('*').where({
        id: req.params.id
    });
    return category;
}

module.exports.createCategory = async (req, res) => {
    let {
        name,
        description
    } = req.body;
    let [added] = await db('categories').insert({
        name,
        description
    });
    return added;
}

module.exports.updateCategory = async (req, res) => {
    let {
        name,
        description
    } = req.body;

    await db('categories').update({
        name,
        description
    }).where({
        id: req.params.id
    });
    return;
}

module.exports.deleteCategory = async (req, res) => {
    await db('categories').where({
        id: req.params.id
    }).del();
    return;
}

module.exports.isCategoryExist = async (id) => {
    const category = await db('categories')
        .where({ id })
        .first();

    return !!category;
};