import Questions from "../models/Questions.js";
import user from '../models/auth.js'
import mongoose from "mongoose";

export const AskQuestion = async (req, res) => {

  const postQuestionData = req.body;
  const userId = req.userId;
  const postQuestion = new Questions({ ...postQuestionData });
  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));

    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }





    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }

    // After updating the question with votes
    await Questions.findByIdAndUpdate(_id, question);
    // Reward system
    if (question.upVote.length % 5 === 0) {

      // Find the user who posted the question
      const User = await user.findById(question.userId);

      User.points += 10; // Reward the user with 10 points

      console.log(User)


      // Logic For Honor Badge
      if (User.points >= 50 && !User.gotHonor) {
        console.log("Honor badge mil gya")
        User.badges.push("Honor Badge");
        User.gotHonor = true;
        await User.save();
      }

      // Logic For Sliver Badge
      if (User.points >= 100 && !User.gotSliver) {
        console.log("Sliver badge mil gya")
        User.badges.push("Sliver Badge");
        User.gotSliver = true;
        await User.save();
      }

      // Logic For Gold Badge
      if (User.points >= 200 && !User.gotGold) {
        console.log("badge mil gya")
        User.badges.push("Gold Badge");
        User.gotGold = true;
        await User.save();
      }

      // Logic For Platinum Badge
      if (User.points >= 500 && !User.gotPlatinum) {
        console.log("Platinum badge mil gya")
        User.badges.push("Platinum Badge");
        User.gotPlatinum = true;
        await User.save();
      }

      await user.findByIdAndUpdate(question.userId, User);
    }

    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};

