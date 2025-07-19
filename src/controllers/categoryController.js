const { privateDecrypt } = require('crypto');
const fs        = require('fs')
const path      = require('path')
const dataPath  = path.join(__dirname, '../data/category.json')

const getCategory = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8');
    const category  = JSON.parse(data);
    res.json(category)
}

const addCategory = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8')
    const category  = JSON.parse(data);

    const newCategory = {
        category_id     : req.body.category_id,
        category_name   : req.body.category_name,
    }
    console.log(newCategory)
    category.push(newCategory);
    fs.writeFileSync(dataPath, JSON.stringify(category, null, 2))

    res.status(201).json(newCategory)
}

module.exports = { getCategory, addCategory }