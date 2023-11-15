const express = require('express');
const router = express.Router();
const { getNotifications,createNotification } = require('../controllers/notiController');
const {verifyAccessToken} =require(  "../middlewares")
router.use(verifyAccessToken);
router.post('/',createNotification);
router.get('/',getNotifications);
module.exports = router;

