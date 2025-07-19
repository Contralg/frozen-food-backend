const express   = require('express')
const router    = express.Router()
const { getTransaction, addTransaction } = require('../controllers/transactionController')

router.get('/transaction', getTransaction);
router.post('/transaction', addTransaction);

module.exports  = router;