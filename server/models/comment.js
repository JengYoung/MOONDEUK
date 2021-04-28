import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    diaryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    content: {
        type: String,
    },
    commentAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;