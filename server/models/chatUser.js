import mongoose from "mongoose";

const chatUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
});

const chatUser = mongoose.model("StackOverflow-bot-user", chatUserSchema);

export default chatUser;