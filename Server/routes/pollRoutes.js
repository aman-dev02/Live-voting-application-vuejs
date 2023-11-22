const express = require('express');
const router = express.Router();
const { createPoll, recordVote,getOpenPolls,mypolls,updatePoll,deletePoll } = require('../controllers/pollControllers');
const {verifyAccessToken} =require(  "../middlewares")
router.use(verifyAccessToken);
router.post('/',createPoll);
router.post('/:id/vote',recordVote);
router.get("/",getOpenPolls);
router.get("/mypolls", mypolls);
router.patch('/update-poll-status/:pollId',updatePoll);
router.delete('/:pollId', deletePoll);
module.exports = router;
