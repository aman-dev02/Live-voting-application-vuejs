const express = require('express');
const router = express.Router();
const { createPoll, recordVote,getOpenPolls,mypolls } = require('../controllers/pollControllers');
const {verifyAccessToken} =require(  "../middlewares")
router.use(verifyAccessToken);
router.post('/',createPoll);
router.post('/:id/vote',recordVote);
router.get("/",getOpenPolls);
router.get("/mypolls", mypolls);
module.exports = router;
