// notificationController.js
const Notification = require('../models/Notification');

const createNotification = async (req, res) => {
    const { username, pollId, poll, optionVoted, userId } = req.body;
  try {
    await Notification.create({ username, pollId, poll, optionVoted,userId });
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Failed to create notification' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ 'poll.createdBy.id': userId });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};


module.exports = { createNotification, getNotifications };
