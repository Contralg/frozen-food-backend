const express   = require('express')
const router    = express.Router()
const { useDefaultData, resetData } = require('../controllers/resetController')

router.post('/default', useDefaultData);
router.post('/reset', resetData);

module.exports  = router;