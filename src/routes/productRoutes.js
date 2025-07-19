const express   = require('express')
const router    = express.Router()
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products', updateProduct);
router.delete('/products', deleteProduct)

module.exports  = router;