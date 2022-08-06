const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()

    }
},{timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
