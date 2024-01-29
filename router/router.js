const router = require('express').Router()
const Chat = require('../controller/Chat')

router.get('/', Chat.index)


module.exports = router