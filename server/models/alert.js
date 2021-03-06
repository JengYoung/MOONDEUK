import mongoose from 'mongoose';

const { Schema } = mongoose;
const alertSchema = new Schema({
    sender_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    receiver_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    type: String,
    type_detail: Schema.Types.Mixed,
    alertAt: {
        type: Date,
        default: Date.now,
    },  
    checkRead: {
        type: Boolean,
        default: false,
    },
})

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;