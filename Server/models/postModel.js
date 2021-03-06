const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

