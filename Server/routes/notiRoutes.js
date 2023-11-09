const express = require('express');
const router = express.Router();
const { storeNotification } = require('../controllers/notiController');
const {verifyAccessToken} =require(  "../middlewares")
router.use(verifyAccessToken);
router.post('/',storeNotification);


