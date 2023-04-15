let express = require('express')
let router = express.Router()
let hotel = require('./api/hotel')

router.get('/dbapi/hotelall', hotel.all)
router.get('/dbapi/hoteladd', hotel.add)

module.exports = router