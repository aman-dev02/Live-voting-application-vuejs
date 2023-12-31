const Poll = require("../models/Poll");
const createPoll = async (req, res) => {
  try {
    const { title, timer, isPublic, options,createdBy } = req.body;

    const poll = new Poll({
      title,
      timer,
      isPublic,
      options,
      isOpen: true, 
      createdBy
    });
    // io.emit('newPoll', newPoll);
    await poll.save();

    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Error creating poll" });
  }
};

const recordVote = async (req, res) => {
  try {
    const pollId = req.params.id;
    const { optionIndex } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const currentTime = new Date();
    const closesAtTime = new Date(poll.closesAt);
    
    if (currentTime > closesAtTime) {
      return res.status(400).json({ message: "Poll is closed" });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: "Invalid option index" });
    }

    poll.options[optionIndex].votes += 1;

    await poll.save();

    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ message: "Error recording vote" });
  }
};


const getOpenPolls = async (req, res) => {
  try {
    const userId = req.user.id;

    const openPolls = await Poll.find({ 'createdBy.id': { $ne: userId } });

    res.status(200).json(openPolls);
  } catch (error) {
    console.error("Error fetching open polls:", error);
    res.status(500).json({ message: "Error fetching open polls" });
  }
};


const mypolls= async (req, res) => {
  try {

    const userid = req.user.id;
    // console.log(userid)
    const myPolls = await Poll.find({ 'createdBy.id': userid });
// console.log(myPolls)
    res.status(200).json(myPolls);
  } catch (error) {
    console.error('Error fetching user polls:', error);
    res.status(500).json({ message: 'Error fetching user polls' });
  }
};

const updatePoll= async (req, res) => {
  const { pollId } = req.params;
  const { isOpen } = req.body;

  try {
    
    const poll = await Poll.findById(pollId);
    if (poll) {
      poll.isOpen = isOpen;
      await poll.save();
      res.json({ message: 'Poll status updated successfully.' });
    } else {
      res.status(404).json({ error: 'Poll not found.' });
    }
  } catch (error) {
    console.error('Error updating poll status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deletePoll = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId);

    if (poll) {
      await poll.remove();
      res.json({ message: 'Poll deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Poll not found.' });
    }
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPoll,
  recordVote,
  getOpenPolls,
  mypolls,
  updatePoll,
  deletePoll
};
