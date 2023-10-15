import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../Components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question";

const DisplayAnswer = ({ question, handleShare }) => {
    const User = useSelector((state) => state.currentUserReducer);
    
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1, User.result._id));
    };
    return (
        <div>
            {question.answer.map((ans) => (
                <div className="display-ans" key={ans._id}>
                    <p className="chat-color">{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button className="chat-color" type="button" onClick={handleShare}>
                                Share
                            </button>
                            {User?.result?._id === ans?.userId && (
                                <button
                                    type="button" 
                                    className="chat-color"
                                    onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div>
                            <p className="chat-color">answered {moment(ans.answeredOn).fromNow()}</p>
                            <Link
                                to={`/Users/${ans.userId}`}
                                className="user-link"
                                style={{ color: "#0086d8" }}
                            >
                                <Avatar
                                    backgroundColor="lightgreen"
                                    px="8px"
                                    py="5px"
                                    borderRadius="4px"
                                >
                                    {ans.userAnswered.charAt(0).toUpperCase()}
                                </Avatar>
                                <div className="chat-color">{ans.userAnswered}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayAnswer;
