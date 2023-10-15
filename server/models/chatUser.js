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

const OTP = mongoose.model("StackOverflow-bot-user", chatUserSchema);

export default OTP;