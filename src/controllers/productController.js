const { privateDecrypt } = require('crypto');
const fs        = require('fs')
const path      = require('path')
const dataPath  = path.join(__dirname, '../data/products.json')

const getProducts = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8');
    const products  = JSON.parse(data);
    res.json(products)
}

const addProduct = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8')
    const products  = JSON.parse(data);

    const newProduct = {
        product_id              : req.body.product_id,
        category_id             : req.body.category_id,
        product_name            : req.body.product_name,
        product_description     : req.body.product_description,
        product_price           : req.body.product_price,
        product_stock           : req.body.product_stock,
        product_icon            : req.body.product_icon
    }

    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2))

    res.status(201).json(newProduct)
}

const updateProduct = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8')
    let products    = JSON.parse(data);
    const updateProductData   = req.body
    
    for (let x in products) {
        const index         = products.findIndex(item => item.product_id === updateProductData['product_id'])
        products[index]     = { ...updateProductData }
    }

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2))
    res.status(201).json(updateProductData)
}

const deleteProduct = (req, res) => {
    const data      = fs.readFileSync(dataPath, 'utf-8')
    const deleteId  = req.body["product_id"]
    let products    = JSON.parse(data);

    const index = products.findIndex(item => item.product_id === deleteId)
    if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" })
    const newData  = products.splice(index, 1)    

    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2))
    res.status(201).json(newData)
}

module.exports = { getProducts, addProduct, updateProduct, deleteProduct }