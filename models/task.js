const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('task', taskSchema);