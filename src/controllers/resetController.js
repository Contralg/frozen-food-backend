const fs                            = require('fs')
const path                          = require('path')
const defaultProductDataPath        = path.join(__dirname, '../data/default_product.json')
const defaultCategoryDataPath       = path.join(__dirname, '../data/default_category.json')
const defaultTransactionDataPath    = path.join(__dirname, '../data/default_transaction.json')
const ProductDataPath               = path.join(__dirname, '../data/products.json')
const CategoryDataPath              = path.join(__dirname, '../data/category.json')
const TransactionDataPath           = path.join(__dirname, '../data/transaction.json')

const useDefaultData = (req, res) => {

    const defaultProductData       = JSON.parse(fs.readFileSync(defaultProductDataPath, 'utf-8'))
    const defaultCategoryData      = JSON.parse(fs.readFileSync(defaultCategoryDataPath, 'utf-8'))
    const defaultTransactionData   = JSON.parse(fs.readFileSync(defaultTransactionDataPath, 'utf-8'))

    fs.writeFileSync(ProductDataPath, JSON.stringify(defaultProductData, null, 2))
    fs.writeFileSync(CategoryDataPath, JSON.stringify(defaultCategoryData, null, 2))
    fs.writeFileSync(TransactionDataPath, JSON.stringify(defaultTransactionData, null, 2))

    const response = {
        message: "Menggunakan Data Default"
    }

    res.status(201).json(response)
}

const resetData = (req, res) => {
    const productData       = []
    const categoryData      = []
    const transactionData   = []

    fs.writeFileSync(ProductDataPath, JSON.stringify(productData, null, 2))
    fs.writeFileSync(CategoryDataPath, JSON.stringify(categoryData, null, 2))
    fs.writeFileSync(TransactionDataPath, JSON.stringify(transactionData, null, 2))

    const response = {
        message: "Semua Data Terhapus"
    }

    res.status(201).json(response)
}

module.exports = { useDefaultData, resetData }