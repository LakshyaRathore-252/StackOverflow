import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import '../../App.css'

import { askQuestion } from "../../actions/question";

const AskQuestion = ({ slideIn, handleSlideIn }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
              userId: User?.result._id
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(questionBody + "\n");
    }
  };


  return (
    <div className="flex ">
      <div className="ask-question w-full">
        <div className="ask-ques-container">
          <h1 className="text-2xl chat-color">Ask a public Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>
                  Be specific and imagine you’re asking a question to another
                  person
                </p>
                <input
                  type="text"
                  id="ask-ques-title"
                  className="text-[#009AFB]"
                  onChange={(e) => {
                    setQuestionTitle(e.target.value);
                  }}
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                />
              </label>
              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>
                  Include all the information someone would need to answer your
                  question
                </p>
                <textarea
                  name=""
                  id="ask-ques-body"
                  className="text-[#009AFB]"


                  onChange={(e) => {
                    setQuestionBody(e.target.value);
                  }}
                  cols="30"
                  rows="10"
                  onKeyPress={handleEnter}
                ></textarea>
              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add up to 5 tags to describe what your question is about</p>
                <input
                  type="text"
                  id="ask-ques-tags"
                  onChange={(e) => {
                    setQuestionTags(e.target.value.split(" "));
                  }}
                  placeholder="e.g. (xml typescript wordpress)"
                  className="text-[#009AFB]"


                />
              </label>
            </div>
            <input
              type="submit"
              value="Reivew your question"
              className="review-btn chat-color"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
