const mongoose = require("mongoose");

var Poll = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
  },
});
const notificationSchema = new mongoose.Schema({
  username: String,
  pollId: String,
  poll: [Poll],
  userId: String,
  optionVoted: String,
  votedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
