const mongoose = require('mongoose')
const Schema = mongoose.Schema

const examSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  title: String,
  date: Date,
  startTime: Date,
  endTime: Date,
  questionDuration: Number,
  questions: [{
    imageURL:String,
    question: String,
    answers: [{
      type: String
    }],
    correct: String
  }],
  resolved: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answers: [{
      question: String,
      answer: String,
      correct: Boolean
    }],
    total: String
  }]

}, {
    timestamps: true
  })

module.exports = mongoose.model('Exam', examSchema)