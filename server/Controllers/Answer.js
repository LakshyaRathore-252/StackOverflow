import mongoose from "mongoose";
import Questions from "../models/Questions.js";
import Users from '../models/auth.js'

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  await updateNoOfQuestions(_id, noOfAnswers, userId);

  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });

    // Update user's points and badges after answering a question
    await updateUserPointsAndBadges(userId);

    const user = await Users.findById(userId);
    console.log("Badge wla user", user)

    // Logic For Honor Badge
    if (user.points >= 50 && !user.gotHonor) {
      console.log("Honor badge mil gya")
      user.badges.push("Honor Badge");
      user.gotHonor = true;
      await user.save();
    }

    // Logic For Sliver Badge
    if (user.points >= 100 && !user.gotSliver) {
      console.log("Sliver badge mil gya")
      user.badges.push("Sliver Badge");
      user.gotSliver = true;
      await user.save();
    }

    // Logic For Gold Badge
    if (user.points >= 200 && !user.gotGold) {
      console.log("badge mil gya")
      user.badges.push("Gold Badge");
      user.gotGold = true;
      await user.save();
    }

    // Logic For Platinum Badge
    if (user.points >= 500 && !user.gotPlatinum) {
      console.log("Platinum badge mil gya")
      user.badges.push("Platinum Badge");
      user.gotPlatinum = true;
      await user.save();
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfQuestions = async (_id, noOfAnswers, userId) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });

    await Users.findByIdAndUpdate(userId, {
      $set: { ansCount: noOfAnswers },
    });

  } catch (error) {
    console.log(error);
  }
};

const updateUserPointsAndBadges = async (userId) => {
  try {
    const user = await Users.findById(userId);
    console.log(user)

    if (!user) return;

    // Increase the number of answered questions
    // user.ansCount = (user.ansCount || 0) + 1;

    // If the user has answered 5 questions, give them a badge and points
    if (user.ansCount % 1 === 0) {
      console.log("user current Points", user.points);
      user.points += 20;
      console.log("user After adding 20 Points", user.points);
      await user.save();
    }

  } catch (error) {
    console.log(error);
  }
};


export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  updateNoOfQuestions(_id, noOfAnswers, userId);
  try {
    await Questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
