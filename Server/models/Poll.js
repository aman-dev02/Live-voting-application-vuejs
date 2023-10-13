const mongoose = require('mongoose');
const User = require('./User.js');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timer: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['minutes', 'hours', 'days'],
      default: 'minutes',
    },
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
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
      ref: 'User',
    },
    username: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closesAt: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      switch (this.timer.unit) {
        case 'minutes':
          currentDate.setMinutes(currentDate.getMinutes() + this.timer.value);
          break;
        case 'hours':
          currentDate.setHours(currentDate.getHours() + this.timer.value);
          break;
        case 'days':
          currentDate.setDate(currentDate.getDate() + this.timer.value);
          break;
        default:
          break;
      }
      return currentDate;
    },
  },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
