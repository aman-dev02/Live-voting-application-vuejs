const express = require('express');
const router = express.Router();
const { storeNotification,getNotifications } = require('../controllers/notiController');
const {verifyAccessToken} =require(  "../middlewares")
router.use(verifyAccessToken);
router.post('/notification',storeNotification);
router.get('/notification',getNotifications);


