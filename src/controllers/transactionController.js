const { privateDecrypt } = require('crypto');
const fs        = require('fs')
const path      = require('path')
const dataPath  = path.join(__dirname, '../data/transaction.json')
const productDataPath = path.join(__dirname, '../data/products.json')

const getTransaction = (req, res) => {
    const data                  = fs.readFileSync(dataPath, 'utf-8');
    const transactions          = JSON.parse(data);
    if(transactions.length === 0) {
        res.json([{"transaction_id": "TRNS-0"}])
    } else {
        res.json(transactions)
    }
}

const addTransaction = (req, res) => {
    const data                = fs.readFileSync(dataPath, 'utf-8')
    const transactions        = JSON.parse(data);
    let productData           = JSON.parse(fs.readFileSync(productDataPath, 'utf-8'))
    const updateProductData   = req.body.transaction_product
    
    for (let x in updateProductData) {
        const index         = productData.findIndex(item => item.product_id === updateProductData[x]['product_id'])
        productData[index]  = { ...productData[index], "product_stock": productData[index]["product_stock"] - updateProductData[x]['product_qty']}
    }

    const newTransaction = {
        transaction_id       : req.body.transaction_id,
        transaction_product  : req.body.transaction_product,
        transaction_price    : req.body.transaction_price,
        transaction_cash     : req.body.transaction_cash,
        transaction_tunai    : req.body.transaction_tunai,
        transaction_complete : req.body.transaction_complete,
        transaction_date     : req.body.transaction_date,
    }

    transactions.push(newTransaction);
    fs.writeFileSync(dataPath, JSON.stringify(transactions, null, 2))
    fs.writeFileSync(productDataPath, JSON.stringify(productData, null, 2))

    const response = {
        transaction_id : newTransaction.transaction_id,
        transaction_price: newTransaction.transaction_price,
        success : true
    }

    res.status(201).json(response)
}

module.exports = { getTransaction, addTransaction }