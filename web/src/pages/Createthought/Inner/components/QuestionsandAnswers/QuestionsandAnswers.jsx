import React, { useEffect, useState } from "react";
import { Dropdown, Form, InputGroup } from "react-bootstrap";
import Button from "../../../../../components/Button/Button";
import CreateModal from "../../../../../components/CreateModal/CreateModal";
import vectorImg from "../../../../../assets/dashboardimg/actionvector.webp";
import answerImg from "../../../../../assets/dashboardimg/answer.png";
import quesaddlogo from "../../../../../assets/images/quesaddlogo.svg";
import plusIcon from "../../../../../assets/dashboardimg/plus.png";
import dotImg from "../../../../../assets/dashboardimg/three-dots.png";
import editpenIcon from "../../../../../assets/dashboardimg/editicon.png";
import trashIcon from "../../../../../assets/dashboardimg/trash.png";
import axios from "axios";
import { useSelector } from "react-redux";
import request from "../../../../../util/request";
import { useForm } from "react-hook-form";
import Deletemodal from "../../../../../components/Deletemodal/Deletemodal";
import DeleteQueAnsModal from "../../../../../components/DeleteQueAnsModal/DeleteQueAnsModal";
const QuestionsandAnswers = (props) => {
  let { thoughtid } = props;

  const [currentID, setCurrentID] = useState("");
  const { auth, user } = useSelector((state) => state.Auth);
  const [show, setShow] = useState(false);
  const { handleSubmit, reset, register } = useForm();
  const [questionanswerList, setquestionanswerList] = useState({});

  useEffect(() => {
    axios
      .post(
        "http://122.169.113.151:3007/api/v1/question-answer/list",
        {
          thoughtId: thoughtid,
          limit: 5,
          page: 1,
          search: "",
          sortKey: "",
          sortBy: 1,
        },
        { headers: { Authorization: `Bearer ${auth.tokenData}` } }
      )
      .then((res) => {
        setquestionanswerList(res.data);
      });
  }, [thoughtid]);

  const handleQuestion = () => {
    setCurrentID(thoughtid);
    setShow(true);
  };

  const [addansshow, setAddansshow] = useState(false);
  const handleAddAnswer = () => {
    setAddansshow(true);
  };

  const [ans, setans] = useState("");
  const [serverError, setServerError] = useState("");

  const [editShow, setEditShow] = useState(false);
  const [editQueId, setEditQueId] = useState("");

  const displyEditQueModal = (queansID) => {
    console.log("first Que Id = ", queansID);
    setEditShow(true);
    setEditQueId(queansID)
  }
  const [isUpadte, setisUpdate] = useState(false);
  const addanswer = (queansID) => {
    if (!isUpadte) {
      request(
        "POST",
        "/question-answer/add-edit",
        {
          questionAnswerId: queansID,
          thoughtId: thoughtid,
          question: "",
          answer: [
            {
              answerName: ans,
              question: [
                {
                  questionName: "",
                  answer: [
                    {
                      answerName: "",
                      question: [
                        {
                          questionName: "",
                          answer: [
                            {
                              answerName: "",
                              question: [
                                {
                                  questionName: "",
                                  answer: [{ answerName: "" }],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {},
        true
      )
        .then((res) => {
          setAddansshow(false);
        })
        .catch((error) => error);
    }
    else {
      request(
        "POST",
        "/question-answer/add-edit",
        {
          questionAnswerId: queansID,
          thoughtId: thoughtid,
          question: "",
          answer: [
            {
              answerName: ans,
              question: [
                {
                  questionName: "",
                  answer: [
                    {
                      answerName: "",
                      question: [
                        {
                          questionName: "",
                          answer: [
                            {
                              answerName: "",
                              question: [
                                {
                                  questionName: "",
                                  answer: [{ answerName: "" }],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {},
        true
      )
        .then((res) => {
          setAddansshow(false);
        })
        .catch((error) => error);
    }
  };

  //#region firstanswer
  const [addAnssQueShow, setAddAnssQueShow] = useState(false);
  const [firstanswersquestion, setfirstanswersquestion] = useState("");
  const handleAddFirstAnswersQuestion = () => {
    setAddAnssQueShow(true);
  };

  const addfirstanswers = (queansID, anse) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: queansID,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: anse,
            question: [
              {
                questionName: firstanswersquestion,
                answer: [
                  {
                    answerName: "",
                    question: [
                      {
                        questionName: "",
                        answer: [
                          {
                            answerName: "",
                            question: [
                              {
                                questionName: "",
                                answer: [{ answerName: "" }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region  secondanswers
  const [addAnssQueAnsShow, setAddAnssQueAnsShow] = useState(false);
  const [secondquestionsAns, setSecondquestionsAns] = useState("");
  const handleAddsecondQuestionAns = () => {
    setAddAnssQueAnsShow(true);
  };

  const addsecondanswers = (queansID, anse, secondques) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: queansID,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: anse,
            question: [
              {
                questionName: secondques,
                answer: [
                  {
                    answerName: secondquestionsAns,
                    question: [
                      {
                        questionName: "",
                        answer: [
                          {
                            answerName: "",
                            question: [
                              {
                                questionName: "",
                                answer: [{ answerName: "" }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region ThirdQuestion
  const [addAnssQueAnsQueShow, setAddAnssQueAnsQueShow] = useState(false);
  const [secondAnssQue, setSecondAnssQue] = useState("");
  const handleAddsecondAnssQue = () => {
    setAddAnssQueAnsQueShow(true);
  };

  const addThirdQuestion = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: secondAnssQue,
                        answer: [
                          {
                            answerName: "",
                            question: [
                              {
                                questionName: "",
                                answer: [{ answerName: "" }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region ThirdAnswer
  const [thirdAnswerShow, setThirdAnswerShow] = useState(false);
  const [ThirdAnswer, setThirdAnswer] = useState("");
  const handleAddThirdAnswer = () => {
    setThirdAnswerShow(true);
  };

  const addThirdAnswer = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName,
    thirdquestionName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: thirdquestionName,
                        answer: [
                          {
                            answerName: ThirdAnswer,
                            question: [
                              {
                                questionName: "",
                                answer: [{ answerName: "" }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region  Fourth Question
  const [fourthQuestionShow, setFourthQuestionShow] = useState(false);
  const [FourthQuestion, setFourthQuestion] = useState("");
  const handleAddFourthQuestion = () => {
    setFourthQuestionShow(true);
  };

  const addFourthQuestion = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName,
    thirdquestionName,
    thirdAnswerName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: thirdquestionName,
                        answer: [
                          {
                            answerName: thirdAnswerName,
                            question: [
                              {
                                questionName: FourthQuestion,
                                answer: [{
                                  answerName: "",
                                  question: [
                                    {
                                      questionName: "",
                                      answer: [{
                                        answerName: ""
                                      }]
                                    }
                                  ]
                                }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region Fourth Answer
  const [fourthAnswerShow, setFourthAnswerShow] = useState(false);
  const [FourthAnswer, setFourthAnswer] = useState("");
  const handleAddFourthAnswer = () => {
    setFourthAnswerShow(true);
  }

  const addFourthAnswer = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName,
    thirdquestionName,
    thirdAnswerName,
    fourthquestionName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: thirdquestionName,
                        answer: [
                          {
                            answerName: thirdAnswerName,
                            question: [
                              {
                                questionName: fourthquestionName,
                                answer: [{ answerName: FourthAnswer }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };
  //#endregion

  //#region FifthQuestion
  const [fifthQuestionShow, setFifthQuestionShow] = useState(false);
  const [FifthQuestion, setFifthQuestion] = useState("");
  const handleAddFifthQuestion = () => {
    setFifthQuestionShow(true);
  }

  const addFifthQuestion = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName,
    thirdquestionName,
    thirdAnswerName,
    fourthquestionName,
    fourthAnswerName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: thirdquestionName,
                        answer: [
                          {
                            answerName: thirdAnswerName,
                            question: [
                              {
                                questionName: fourthquestionName,
                                answer: [
                                  {
                                    answerName: fourthAnswerName,
                                    question: [
                                      {
                                        questionName: FifthQuestion,
                                        answer: [{
                                          answerName: "",
                                        }]
                                      }
                                    ]
                                  }
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };

  //#endregion

  //#region FifthAnswer
  const [fifthAnswerShow, setFifthAnswerShow] = useState(false);
  const [FifthAnswer, setFifthAnswer] = useState("");
  const handleAddFifthAnswer = () => {
    setFifthAnswerShow(true);
  }


  const addFifthAnswer = (
    questionAnswerId,
    answerName,
    secondquestionName,
    secondanswerName,
    thirdquestionName,
    thirdAnswerName,
    fourthquestionName,
    fourthAnswerName,
    fifthquestionName
  ) => {
    request(
      "POST",
      "/question-answer/add-edit",
      {
        questionAnswerId: questionAnswerId,
        thoughtId: thoughtid,
        question: "",
        answer: [
          {
            answerName: answerName,
            question: [
              {
                questionName: secondquestionName,
                answer: [
                  {
                    answerName: secondanswerName,
                    question: [
                      {
                        questionName: thirdquestionName,
                        answer: [
                          {
                            answerName: thirdAnswerName,
                            question: [
                              {
                                questionName: fourthquestionName,
                                answer: [
                                  {
                                    answerName: fourthAnswerName,
                                    question: [
                                      {
                                        questionName: fifthquestionName,
                                        answer: [{
                                          answerName: FifthAnswer,
                                        }]
                                      }
                                    ]
                                  }
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {},
      true
    )
      .then((res) => {
        setAddAnssQueShow(false);
      })
      .catch((error) => error);
  };

  //#endregion

  ////// view edit first anser view /////
  const [getAnsValue, setGetAnsValue] = useState("");
  const [editAnswerId, setEditAnswerId] = useState("")
  const [editAnsShow, setEditAnsShow] = useState(false);
  const handleChange = (e) => {
    setGetAnsValue({ ...getAnsValue, [e.target.name]: e.traget.value })
  }

  const editFirstAns = async (editQueId, editAnswerId, editFirstAns) => {
    setEditAnswerId(editAnswerId)
    setEditAnsShow(true);
    const { ...getData } = editFirstAns
    await axios.post(
      `http://122.169.113.151:3007/api/v1/question-answer/view`,
      { questionAnswerId: editQueId, answer: [{ answerId: editAnswerId, answerName: editFirstAns }] },
      { headers: { Authorization: `Bearer ${auth.tokenData}` } }
    )
      .then((res) => {
        setGetAnsValue(res.data.data.answer[0].answerName)
        setisUpdate(true);
      })
      .catch((err) => { console.log(err); })
  }


  const [delShow, setDelShow] = useState(false)
  const [delQueid, setDelQueId] = useState(null);
  const deleteFirstQue = (id) => {
    setDelQueId(id);
    setDelShow(true);
  }

  const delFirstAns = async (delQueId, delAnsId) => {
    await axios.post(`http://122.169.113.151:3007/api/v1/question-answer/delete`,
      { questionAnswerId: delQueId, answer: [{ answerId: delAnsId }] }, { headers: { Authorization: `Bearer ${auth.tokenData}` } })
      .then((res) => { console.log(res, "delete response") })
      .catch((err) => { console.log(err, "catch Block deisplay in delete Api") })
  }


  return (
    <div className="action-wholebox ">
      <div className="header-box">
        <div className="title-text">
          <h2>Questions & Answers</h2>
        </div>
        <div className="head-btnbox">
          <Button
            isLink={false}
            addedClass="quesc"
            onClick={editQueId ? displyEditQueModal : handleQuestion}
            logoClass="plus"
            text="Create Question"
            type="button"
          />
          <CreateModal
            editQue={editQueId}
            show={show || editShow}
            setShow={setShow || setEditShow}
            title={"Create Question"}
            lblTitle={"Question Title"}
            lblPlaceHolder={"Which resources do I need to start?"}
          />
        </div>
      </div>
      {serverError && (
        <p style={{ color: "red", marginLeft: "300px" }}>{serverError}</p>
      )}

      {questionanswerList && questionanswerList?.data?.length == 0 ? (
        <>
          <div className="actionvector-box">
            <div className="vector-image">
              <img src={vectorImg} alt="" className="img-fluid" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Form>
            {questionanswerList?.data?.map((qa, i) => {
              return (
                <>
                  <div className="card" key={i}>
                    <div className="card-body">
                      <ol className="question-cardbox">
                        <li>
                          <div className="actionques-box">
                            <div className="quesc-ans-box">
                              <div className="question-editbox">
                                <div className="question">Q: {qa.question}</div>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                  >
                                    <img src={dotImg} alt="" />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleAddAnswer}>
                                      {" "}
                                      <span>
                                        <img src={plusIcon} alt="" />
                                      </span>{" "}
                                      Add Answers
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => displyEditQueModal(qa.questionAnswerId)}>
                                      {" "}
                                      <span>
                                        <img src={editpenIcon} alt="" />
                                      </span>{" "}
                                      Edit Question
                                    </Dropdown.Item>
                                    <DeleteQueAnsModal show={delShow} setShow={setDelShow} deleteQueId={delQueid} />
                                    <Dropdown.Item onClick={() => deleteFirstQue(qa.questionAnswerId)}>
                                      {" "}
                                      <span>
                                        <img src={trashIcon} alt="" />
                                      </span>{" "}
                                      Delete Question
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                              {addansshow && (
                                <>
                                  {/* Add-Answers TextBox Show    || editAnsShow &&   editAnswerId*/}
                                  <div className="edit-ques">
                                    <InputGroup className="mb-3">
                                      <InputGroup.Text id="basic-addon1">
                                        {" "}
                                        <img src={answerImg} alt="" />{" "}
                                      </InputGroup.Text>
                                      <Form.Control
                                        className="icontrol"
                                        placeholder="answer"
                                        aria-label="answer"
                                        aria-describedby="basic-addon1"

                                        onChange={(e) => setans(e.target.value)}
                                        defaultValue={ans.answerName}

                                      />
                                      <InputGroup.Text id="basic-addon1">
                                        <Button
                                          addedClass="close-btn"
                                          type="button"
                                          isLink={false}
                                          text={editAnswerId ? "Update" : "Add"}
                                          onClick={() =>
                                            addanswer(qa.questionAnswerId)
                                          }
                                        />
                                      </InputGroup.Text>
                                    </InputGroup>
                                  </div>
                                </>
                              )}
                              {qa.answer &&
                                qa.answer.map((asw, i) => {
                                  return (
                                    <>
                                      <div
                                        className="question-editbox answer"
                                        key={i}
                                      >
                                        <div className="answer">
                                          A: {asw.answerName}
                                        </div>
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            variant="success"
                                            id="dropdown-basic"
                                          >
                                            <img src={dotImg} alt="" />
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item
                                              onClick={
                                                handleAddFirstAnswersQuestion
                                              }
                                            >
                                              {" "}
                                              <span>
                                                <img src={plusIcon} alt="" />
                                              </span>{" "}
                                              Add Question
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => editFirstAns(qa.questionAnswerId, asw.answerId, asw.answerName)}>
                                              {" "}
                                              <span>
                                                <img src={editpenIcon} alt="" />
                                              </span>{" "}
                                              Edit Answer
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => delFirstAns(qa.questionAnswerId, asw.answerId)}>
                                              {" "}
                                              <span>
                                                <img src={trashIcon} alt="" />
                                              </span>{" "}
                                              Delete Answer
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>

                                      <ul className="inner-quesc">
                                        <li>
                                          {addAnssQueShow && (
                                            <>
                                              {/* Add-first-answer's-Question TextBox Show */}
                                              <div className="edit-ques">
                                                <InputGroup className="mb-3">
                                                  <InputGroup.Text id="basic-addon1">
                                                    {" "}
                                                    <img
                                                      src={quesaddlogo}
                                                      alt=""
                                                    />{" "}
                                                  </InputGroup.Text>
                                                  <Form.Control
                                                    className="icontrol"
                                                    placeholder="Question"
                                                    aria-label="question"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) =>
                                                      setfirstanswersquestion(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  <InputGroup.Text id="basic-addon1">
                                                    <Button
                                                      addedClass="close-btn"
                                                      type="button"
                                                      isLink={false}
                                                      text="Add"
                                                      onClick={() =>
                                                        addfirstanswers(
                                                          qa.questionAnswerId,
                                                          asw.answerName
                                                        )
                                                      }
                                                    />
                                                  </InputGroup.Text>
                                                </InputGroup>
                                              </div>
                                            </>
                                          )}
                                        </li>
                                      </ul>

                                      {asw.question &&
                                        asw.question.map((ansques, i) => {
                                          return (
                                            <>
                                              <div
                                                className="actionques-box"
                                                key={i}
                                              >
                                                <div className="quesc-ans-box">
                                                  <div className="question-editbox">
                                                    <div className="question">
                                                      Q: {ansques.questionName}
                                                    </div>
                                                    <Dropdown>
                                                      <Dropdown.Toggle
                                                        variant="success"
                                                        id="dropdown-basic"
                                                      >
                                                        <img
                                                          src={dotImg}
                                                          alt=""
                                                        />
                                                      </Dropdown.Toggle>

                                                      <Dropdown.Menu>
                                                        <Dropdown.Item
                                                          onClick={
                                                            handleAddsecondQuestionAns
                                                          }
                                                        >
                                                          {" "}
                                                          <span>
                                                            <img
                                                              src={plusIcon}
                                                              alt=""
                                                            />
                                                          </span>{" "}
                                                          Add Answers
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">
                                                          {" "}
                                                          <span>
                                                            <img
                                                              src={editpenIcon}
                                                              alt=""
                                                            />
                                                          </span>{" "}
                                                          Edit Question
                                                        </Dropdown.Item>
                                                        <Dropdown.Item href="#/action-4">
                                                          {" "}
                                                          <span>
                                                            <img
                                                              src={trashIcon}
                                                              alt=""
                                                            />
                                                          </span>{" "}
                                                          Delete Question
                                                        </Dropdown.Item>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  </div>

                                                  {addAnssQueAnsShow && (
                                                    <>
                                                      {/*  textbox for add a new question */}
                                                      <div className="edit-ques">
                                                        <InputGroup className="mb-3">
                                                          <InputGroup.Text id="basic-addon1">
                                                            {" "}
                                                            <img
                                                              src={answerImg}
                                                              alt=""
                                                            />{" "}
                                                          </InputGroup.Text>
                                                          <Form.Control
                                                            className="icontrol"
                                                            placeholder="Answer"
                                                            aria-label="Answer"
                                                            aria-describedby="basic-addon1"
                                                            onChange={(e) =>
                                                              setSecondquestionsAns(
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                          <InputGroup.Text id="basic-addon1">
                                                            <button
                                                              className="common-btn close-btn"
                                                              onClick={() =>
                                                                addsecondanswers(
                                                                  qa.questionAnswerId,
                                                                  asw.answerName,
                                                                  ansques.questionName
                                                                )
                                                              }
                                                            >
                                                              Add
                                                            </button>
                                                          </InputGroup.Text>
                                                        </InputGroup>
                                                      </div>
                                                    </>
                                                  )}
                                                  {ansques.answer.map(
                                                    (secondAns, i) => {
                                                      return (
                                                        <>
                                                          <div
                                                            className="question-editbox answer"
                                                            key={i}
                                                          >
                                                            <div className="answer">
                                                              A:{" "}
                                                              {
                                                                secondAns.answerName
                                                              }
                                                            </div>
                                                            <Dropdown>
                                                              <Dropdown.Toggle
                                                                variant="success"
                                                                id="dropdown-basic"
                                                              >
                                                                <img
                                                                  src={dotImg}
                                                                  alt=""
                                                                />
                                                              </Dropdown.Toggle>

                                                              <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                  onClick={
                                                                    handleAddsecondAnssQue
                                                                  }
                                                                >
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        plusIcon
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </span>
                                                                  Add Question
                                                                </Dropdown.Item>
                                                                <Dropdown.Item href="#/action-1">
                                                                  {" "}
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        editpenIcon
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </span>{" "}
                                                                  Edit Answer
                                                                </Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">
                                                                  {" "}
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        trashIcon
                                                                      }
                                                                      alt=""
                                                                    />
                                                                  </span>{" "}
                                                                  Delete Answer
                                                                </Dropdown.Item>
                                                              </Dropdown.Menu>
                                                            </Dropdown>
                                                          </div>

                                                          {/* third Question add text-Box */}
                                                          {addAnssQueAnsQueShow && (
                                                            <>
                                                              <div className="edit-ques">
                                                                <InputGroup className="mb-3">
                                                                  <InputGroup.Text id="basic-addon1">
                                                                    {" "}
                                                                    <img
                                                                      src={
                                                                        quesaddlogo
                                                                      }
                                                                      alt=""
                                                                    />{" "}
                                                                  </InputGroup.Text>
                                                                  <Form.Control
                                                                    className="icontrol"
                                                                    placeholder="Question"
                                                                    aria-label="Question"
                                                                    aria-describedby="basic-addon1"
                                                                    onChange={(
                                                                      e
                                                                    ) =>
                                                                      setSecondAnssQue(
                                                                        e.target
                                                                          .value
                                                                      )
                                                                    }
                                                                  />
                                                                  <InputGroup.Text id="basic-addon1">
                                                                    <button
                                                                      className="common-btn close-btn"
                                                                      onClick={() =>
                                                                        addThirdQuestion(
                                                                          qa.questionAnswerId,
                                                                          asw.answerName,
                                                                          ansques.questionName,
                                                                          secondAns.answerName
                                                                        )
                                                                      }
                                                                    >
                                                                      Add
                                                                    </button>
                                                                  </InputGroup.Text>
                                                                </InputGroup>
                                                              </div>
                                                            </>
                                                          )}

                                                          {secondAns.question &&
                                                            secondAns.question.map(
                                                              (thirdQue, i) => {
                                                                return (
                                                                  <>
                                                                    <div
                                                                      className="actionques-box"
                                                                      key={i}
                                                                    >
                                                                      <div className="quesc-ans-box">
                                                                        <div className="question-editbox">
                                                                          <div className="question">
                                                                            Q:{" "}
                                                                            {
                                                                              thirdQue.questionName
                                                                            }
                                                                          </div>
                                                                          <Dropdown>
                                                                            <Dropdown.Toggle
                                                                              variant="success"
                                                                              id="dropdown-basic"
                                                                            >
                                                                              <img
                                                                                src={
                                                                                  dotImg
                                                                                }
                                                                                alt=""
                                                                              />
                                                                            </Dropdown.Toggle>

                                                                            <Dropdown.Menu>
                                                                              <Dropdown.Item
                                                                                onClick={
                                                                                  handleAddThirdAnswer
                                                                                }
                                                                              >
                                                                                <span>
                                                                                  <img
                                                                                    src={
                                                                                      plusIcon
                                                                                    }
                                                                                    alt=""
                                                                                  />
                                                                                </span>
                                                                                Add
                                                                                Answers
                                                                              </Dropdown.Item>
                                                                              <Dropdown.Item href="#/action-2">
                                                                                {" "}
                                                                                <span>
                                                                                  <img
                                                                                    src={
                                                                                      editpenIcon
                                                                                    }
                                                                                    alt=""
                                                                                  />
                                                                                </span>{" "}
                                                                                Edit
                                                                                Question
                                                                              </Dropdown.Item>
                                                                              <Dropdown.Item href="#/action-4">
                                                                                {" "}
                                                                                <span>
                                                                                  <img
                                                                                    src={
                                                                                      trashIcon
                                                                                    }
                                                                                    alt=""
                                                                                  />
                                                                                </span>{" "}
                                                                                Delete
                                                                                Question
                                                                              </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                          </Dropdown>
                                                                        </div>
                                                                      </div>
                                                                    </div>

                                                                    {/* third Answer add text-Box */}
                                                                    {thirdAnswerShow && (
                                                                      <>
                                                                        <div className="edit-ques">
                                                                          <InputGroup className="mb-3">
                                                                            <InputGroup.Text id="basic-addon1">
                                                                              {" "}
                                                                              <img
                                                                                src={
                                                                                  answerImg
                                                                                }
                                                                                alt=""
                                                                              />{" "}
                                                                            </InputGroup.Text>
                                                                            <Form.Control
                                                                              className="icontrol"
                                                                              placeholder="Answer"
                                                                              aria-label="Answer"
                                                                              aria-describedby="basic-addon1"
                                                                              onChange={(
                                                                                e
                                                                              ) =>
                                                                                setThirdAnswer(
                                                                                  e
                                                                                    .target
                                                                                    .value
                                                                                )
                                                                              }
                                                                            />
                                                                            <InputGroup.Text id="basic-addon1">
                                                                              <button
                                                                                className="common-btn close-btn"
                                                                                onClick={() =>
                                                                                  addThirdAnswer(
                                                                                    qa.questionAnswerId,
                                                                                    asw.answerName,
                                                                                    ansques.questionName,
                                                                                    secondAns.answerName,
                                                                                    thirdQue.questionName
                                                                                  )
                                                                                }
                                                                              >
                                                                                Add
                                                                              </button>
                                                                            </InputGroup.Text>
                                                                          </InputGroup>
                                                                        </div>
                                                                      </>
                                                                    )}

                                                                    {/* Third Answer Content Show Here */}
                                                                    {thirdQue.answer &&
                                                                      thirdQue.answer.map(
                                                                        (
                                                                          thirdAns,
                                                                          i
                                                                        ) => {
                                                                          return (
                                                                            <>
                                                                              <div
                                                                                className="question-editbox answer"
                                                                                key={
                                                                                  i
                                                                                }
                                                                              >
                                                                                <div className="answer">
                                                                                  A:{" "}
                                                                                  {
                                                                                    thirdAns.answerName
                                                                                  }
                                                                                </div>
                                                                                <Dropdown>
                                                                                  <Dropdown.Toggle
                                                                                    variant="success"
                                                                                    id="dropdown-basic"
                                                                                  >
                                                                                    <img
                                                                                      src={
                                                                                        dotImg
                                                                                      }
                                                                                      alt=""
                                                                                    />
                                                                                  </Dropdown.Toggle>

                                                                                  <Dropdown.Menu>
                                                                                    <Dropdown.Item
                                                                                      onClick={
                                                                                        handleAddFourthQuestion
                                                                                      }
                                                                                    >
                                                                                      <span>
                                                                                        <img
                                                                                          src={
                                                                                            plusIcon
                                                                                          }
                                                                                          alt=""
                                                                                        />
                                                                                      </span>
                                                                                      Add
                                                                                      Question
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href="#/action-1">
                                                                                      {" "}
                                                                                      <span>
                                                                                        <img
                                                                                          src={
                                                                                            editpenIcon
                                                                                          }
                                                                                          alt=""
                                                                                        />
                                                                                      </span>{" "}
                                                                                      Edit
                                                                                      Answer
                                                                                    </Dropdown.Item>
                                                                                    <Dropdown.Item href="#/action-2">
                                                                                      {" "}
                                                                                      <span>
                                                                                        <img
                                                                                          src={
                                                                                            trashIcon
                                                                                          }
                                                                                          alt=""
                                                                                        />
                                                                                      </span>{" "}
                                                                                      Delete
                                                                                      Answer
                                                                                    </Dropdown.Item>
                                                                                  </Dropdown.Menu>
                                                                                </Dropdown>
                                                                              </div>
                                                                              {/* Fourth Question AddEdit textBox */}
                                                                              {fourthQuestionShow && (
                                                                                <div className="edit-ques">
                                                                                  <InputGroup className="mb-3">
                                                                                    <InputGroup.Text id="basic-addon1">
                                                                                      <img
                                                                                        src={
                                                                                          quesaddlogo
                                                                                        }
                                                                                        alt=""
                                                                                      />
                                                                                    </InputGroup.Text>
                                                                                    <Form.Control
                                                                                      className="icontrol"
                                                                                      placeholder="Question"
                                                                                      aria-label="Question"
                                                                                      aria-describedby="basic-addon1"
                                                                                      onChange={(
                                                                                        e
                                                                                      ) =>
                                                                                        setFourthQuestion(
                                                                                          e
                                                                                            .target
                                                                                            .value
                                                                                        )
                                                                                      }
                                                                                    />
                                                                                    <InputGroup.Text id="basic-addon1">
                                                                                      <button
                                                                                        className="common-btn close-btn"
                                                                                        onClick={() =>
                                                                                          addFourthQuestion(
                                                                                            qa.questionAnswerId,
                                                                                            asw.answerName,
                                                                                            ansques.questionName,
                                                                                            secondAns.answerName,
                                                                                            thirdQue.questionName,
                                                                                            thirdAns.answerName
                                                                                          )
                                                                                        }
                                                                                      >
                                                                                        Add
                                                                                      </button>
                                                                                    </InputGroup.Text>
                                                                                  </InputGroup>
                                                                                </div>
                                                                              )}

                                                                              {thirdAns.question &&
                                                                                thirdAns.question.map(
                                                                                  (
                                                                                    fourthQue,
                                                                                    i
                                                                                  ) => {
                                                                                    return (
                                                                                      <>
                                                                                        <div
                                                                                          className="question-editbox answer"
                                                                                          key={
                                                                                            i
                                                                                          }
                                                                                        >
                                                                                          <div className="answer">
                                                                                            Q:{" "}
                                                                                            {
                                                                                              fourthQue.questionName
                                                                                            }
                                                                                          </div>
                                                                                          <Dropdown>
                                                                                            <Dropdown.Toggle
                                                                                              variant="success"
                                                                                              id="dropdown-basic"
                                                                                            >
                                                                                              <img
                                                                                                src={
                                                                                                  dotImg
                                                                                                }
                                                                                                alt=""
                                                                                              />
                                                                                            </Dropdown.Toggle>

                                                                                            <Dropdown.Menu>
                                                                                              <Dropdown.Item onClick={handleAddFourthAnswer}>
                                                                                                <span>
                                                                                                  <img
                                                                                                    src={
                                                                                                      plusIcon
                                                                                                    }
                                                                                                    alt=""
                                                                                                  />
                                                                                                </span>
                                                                                                Add
                                                                                                Answer
                                                                                              </Dropdown.Item>
                                                                                              <Dropdown.Item href="#/action-1">
                                                                                                {" "}
                                                                                                <span>
                                                                                                  <img
                                                                                                    src={
                                                                                                      editpenIcon
                                                                                                    }
                                                                                                    alt=""
                                                                                                  />
                                                                                                </span>{" "}
                                                                                                Edit
                                                                                                Question
                                                                                              </Dropdown.Item>
                                                                                              <Dropdown.Item href="#/action-2">
                                                                                                {" "}
                                                                                                <span>
                                                                                                  <img
                                                                                                    src={
                                                                                                      trashIcon
                                                                                                    }
                                                                                                    alt=""
                                                                                                  />
                                                                                                </span>{" "}
                                                                                                Delete
                                                                                                Question
                                                                                              </Dropdown.Item>
                                                                                            </Dropdown.Menu>
                                                                                          </Dropdown>
                                                                                        </div>

                                                                                        {/* Fourth Answer AddEdit textBox */}
                                                                                        {fourthAnswerShow && (
                                                                                          <div className="edit-ques">
                                                                                            <InputGroup className="mb-3">
                                                                                              <InputGroup.Text id="basic-addon1">
                                                                                                <img
                                                                                                  src={
                                                                                                    answerImg
                                                                                                  }
                                                                                                  alt=""
                                                                                                />
                                                                                              </InputGroup.Text>
                                                                                              <Form.Control
                                                                                                className="icontrol"
                                                                                                placeholder="Answer"
                                                                                                aria-label="Answer"
                                                                                                aria-describedby="basic-addon1"
                                                                                                onChange={(
                                                                                                  e
                                                                                                ) =>
                                                                                                  setFourthAnswer(
                                                                                                    e
                                                                                                      .target
                                                                                                      .value
                                                                                                  )
                                                                                                }
                                                                                              />
                                                                                              <InputGroup.Text id="basic-addon1">
                                                                                                <button
                                                                                                  className="common-btn close-btn"
                                                                                                  onClick={() =>
                                                                                                    addFourthAnswer(
                                                                                                      qa.questionAnswerId,
                                                                                                      asw.answerName,
                                                                                                      ansques.questionName,
                                                                                                      secondAns.answerName,
                                                                                                      thirdQue.questionName,
                                                                                                      thirdAns.answerName,
                                                                                                      fourthQue.questionName
                                                                                                    )
                                                                                                  }
                                                                                                >
                                                                                                  Add
                                                                                                </button>
                                                                                              </InputGroup.Text>
                                                                                            </InputGroup>
                                                                                          </div>
                                                                                        )}

                                                                                        {fourthQue.answer &&
                                                                                          fourthQue.answer.map(
                                                                                            (
                                                                                              fourthAns,
                                                                                              i
                                                                                            ) => {
                                                                                              return (
                                                                                                <>
                                                                                                  <div
                                                                                                    className="question-editbox answer"
                                                                                                    key={
                                                                                                      i
                                                                                                    }
                                                                                                  >
                                                                                                    <div className="answer">
                                                                                                      A:{" "}
                                                                                                      {
                                                                                                        fourthAns.answerName
                                                                                                      }
                                                                                                    </div>
                                                                                                    <Dropdown>
                                                                                                      <Dropdown.Toggle
                                                                                                        variant="success"
                                                                                                        id="dropdown-basic"
                                                                                                      >
                                                                                                        <img
                                                                                                          src={
                                                                                                            dotImg
                                                                                                          }
                                                                                                          alt=""
                                                                                                        />
                                                                                                      </Dropdown.Toggle>

                                                                                                      <Dropdown.Menu>
                                                                                                        <Dropdown.Item onClick={handleAddFifthQuestion}>
                                                                                                          <span>
                                                                                                            <img
                                                                                                              src={
                                                                                                                plusIcon
                                                                                                              }
                                                                                                              alt=""
                                                                                                            />
                                                                                                          </span>
                                                                                                          Add Question
                                                                                                        </Dropdown.Item>
                                                                                                        <Dropdown.Item href="#/action-1">
                                                                                                          {" "}
                                                                                                          <span>
                                                                                                            <img
                                                                                                              src={
                                                                                                                editpenIcon
                                                                                                              }
                                                                                                              alt=""
                                                                                                            />
                                                                                                          </span>{" "}
                                                                                                          Edit
                                                                                                          Answer
                                                                                                        </Dropdown.Item>
                                                                                                        <Dropdown.Item href="#/action-2">
                                                                                                          {" "}
                                                                                                          <span>
                                                                                                            <img
                                                                                                              src={
                                                                                                                trashIcon
                                                                                                              }
                                                                                                              alt=""
                                                                                                            />
                                                                                                          </span>{" "}
                                                                                                          Delete
                                                                                                          Answer
                                                                                                        </Dropdown.Item>
                                                                                                      </Dropdown.Menu>
                                                                                                    </Dropdown>
                                                                                                  </div>

                                                                                                  {/* Fifth Question AddEdit textBox */}
                                                                                                  {fifthQuestionShow && (
                                                                                                    <div className="edit-ques">
                                                                                                      <InputGroup className="mb-3">
                                                                                                        <InputGroup.Text id="basic-addon1">
                                                                                                          <img
                                                                                                            src={
                                                                                                              answerImg
                                                                                                            }
                                                                                                            alt=""
                                                                                                          />
                                                                                                        </InputGroup.Text>
                                                                                                        <Form.Control
                                                                                                          className="icontrol"
                                                                                                          placeholder="Question"
                                                                                                          aria-label="Question"
                                                                                                          aria-describedby="basic-addon1"
                                                                                                          onChange={(
                                                                                                            e
                                                                                                          ) =>
                                                                                                            setFifthQuestion(
                                                                                                              e
                                                                                                                .target
                                                                                                                .value
                                                                                                            )
                                                                                                          }
                                                                                                        />
                                                                                                        <InputGroup.Text id="basic-addon1">
                                                                                                          <button
                                                                                                            className="common-btn close-btn"
                                                                                                            onClick={() =>
                                                                                                              addFifthQuestion(
                                                                                                                qa.questionAnswerId,
                                                                                                                asw.answerName,
                                                                                                                ansques.questionName,
                                                                                                                secondAns.answerName,
                                                                                                                thirdQue.questionName,
                                                                                                                thirdAns.answerName,
                                                                                                                fourthQue.questionName,
                                                                                                                fourthAns.answerName
                                                                                                              )
                                                                                                            }
                                                                                                          >
                                                                                                            Add
                                                                                                          </button>
                                                                                                        </InputGroup.Text>
                                                                                                      </InputGroup>
                                                                                                    </div>
                                                                                                  )}

                                                                                                  {fourthAns.question &&
                                                                                                    fourthAns.question.map(
                                                                                                      (
                                                                                                        fifthQuestion,
                                                                                                        i
                                                                                                      ) => {
                                                                                                        return (
                                                                                                          <>
                                                                                                            <div
                                                                                                              className="question-editbox answer"
                                                                                                              key={
                                                                                                                i
                                                                                                              }
                                                                                                            >
                                                                                                              <div className="answer">
                                                                                                                A:{" "}
                                                                                                                {
                                                                                                                  fifthQuestion.questionName
                                                                                                                }
                                                                                                              </div>
                                                                                                              <Dropdown>
                                                                                                                <Dropdown.Toggle
                                                                                                                  variant="success"
                                                                                                                  id="dropdown-basic"
                                                                                                                >
                                                                                                                  <img
                                                                                                                    src={
                                                                                                                      dotImg
                                                                                                                    }
                                                                                                                    alt=""
                                                                                                                  />
                                                                                                                </Dropdown.Toggle>

                                                                                                                <Dropdown.Menu>
                                                                                                                  <Dropdown.Item onClick={handleAddFifthAnswer}>
                                                                                                                    <span>
                                                                                                                      <img
                                                                                                                        src={
                                                                                                                          plusIcon
                                                                                                                        }
                                                                                                                        alt=""
                                                                                                                      />
                                                                                                                    </span>
                                                                                                                    Add Answer
                                                                                                                  </Dropdown.Item>
                                                                                                                  <Dropdown.Item href="#/action-1">
                                                                                                                    {" "}
                                                                                                                    <span>
                                                                                                                      <img
                                                                                                                        src={
                                                                                                                          editpenIcon
                                                                                                                        }
                                                                                                                        alt=""
                                                                                                                      />
                                                                                                                    </span>{" "}
                                                                                                                    Edit
                                                                                                                    Answer
                                                                                                                  </Dropdown.Item>
                                                                                                                  <Dropdown.Item href="#/action-2">
                                                                                                                    {" "}
                                                                                                                    <span>
                                                                                                                      <img
                                                                                                                        src={
                                                                                                                          trashIcon
                                                                                                                        }
                                                                                                                        alt=""
                                                                                                                      />
                                                                                                                    </span>{" "}
                                                                                                                    Delete
                                                                                                                    Answer
                                                                                                                  </Dropdown.Item>
                                                                                                                </Dropdown.Menu>
                                                                                                              </Dropdown>
                                                                                                            </div>


                                                                                                            {/* ------------------------------------ */}


                                                                                                            {/* Fifth Question AddEdit textBox */}
                                                                                                            {fifthAnswerShow && (
                                                                                                              <div className="edit-ques">
                                                                                                                <InputGroup className="mb-3">
                                                                                                                  <InputGroup.Text id="basic-addon1">
                                                                                                                    <img
                                                                                                                      src={
                                                                                                                        answerImg
                                                                                                                      }
                                                                                                                      alt=""
                                                                                                                    />
                                                                                                                  </InputGroup.Text>
                                                                                                                  <Form.Control
                                                                                                                    className="icontrol"
                                                                                                                    placeholder="Answer"
                                                                                                                    aria-label="Answer"
                                                                                                                    aria-describedby="basic-addon1"
                                                                                                                    onChange={(
                                                                                                                      e
                                                                                                                    ) =>
                                                                                                                      setFifthAnswer(
                                                                                                                        e
                                                                                                                          .target
                                                                                                                          .value
                                                                                                                      )
                                                                                                                    }
                                                                                                                  />
                                                                                                                  <InputGroup.Text id="basic-addon1">
                                                                                                                    <button
                                                                                                                      className="common-btn close-btn"
                                                                                                                      onClick={() =>
                                                                                                                        addFifthAnswer(
                                                                                                                          qa.questionAnswerId,
                                                                                                                          asw.answerName,
                                                                                                                          ansques.questionName,
                                                                                                                          secondAns.answerName,
                                                                                                                          thirdQue.questionName,
                                                                                                                          thirdAns.answerName,
                                                                                                                          fourthQue.questionName,
                                                                                                                          fourthAns.answerName,
                                                                                                                          fifthQuestion.questionName
                                                                                                                        )
                                                                                                                      }
                                                                                                                    >
                                                                                                                      Add
                                                                                                                    </button>
                                                                                                                  </InputGroup.Text>
                                                                                                                </InputGroup>
                                                                                                              </div>
                                                                                                            )}

                                                                                                            {fifthQuestion.answer &&
                                                                                                              fifthQuestion.answer.map(
                                                                                                                (
                                                                                                                  fifthAns,
                                                                                                                  i
                                                                                                                ) => {
                                                                                                                  return (
                                                                                                                    <>
                                                                                                                      <div
                                                                                                                        className="question-editbox answer"
                                                                                                                        key={
                                                                                                                          i
                                                                                                                        }
                                                                                                                      >
                                                                                                                        <div className="answer">
                                                                                                                          A:{" "}
                                                                                                                          {
                                                                                                                            fifthAns.answerName
                                                                                                                          }
                                                                                                                        </div>
                                                                                                                        <Dropdown>
                                                                                                                          <Dropdown.Toggle
                                                                                                                            variant="success"
                                                                                                                            id="dropdown-basic"
                                                                                                                          >
                                                                                                                            <img
                                                                                                                              src={
                                                                                                                                dotImg
                                                                                                                              }
                                                                                                                              alt=""
                                                                                                                            />
                                                                                                                          </Dropdown.Toggle>

                                                                                                                          <Dropdown.Menu>
                                                                                                                            <Dropdown.Item>
                                                                                                                              <span>
                                                                                                                                <img
                                                                                                                                  src={
                                                                                                                                    plusIcon
                                                                                                                                  }
                                                                                                                                  alt=""
                                                                                                                                />
                                                                                                                              </span>
                                                                                                                              Convert To Action
                                                                                                                            </Dropdown.Item>
                                                                                                                            <Dropdown.Item href="#/action-1">
                                                                                                                              {" "}
                                                                                                                              <span>
                                                                                                                                <img
                                                                                                                                  src={
                                                                                                                                    editpenIcon
                                                                                                                                  }
                                                                                                                                  alt=""
                                                                                                                                />
                                                                                                                              </span>{" "}
                                                                                                                              Edit
                                                                                                                              Answer
                                                                                                                            </Dropdown.Item>
                                                                                                                            <Dropdown.Item href="#/action-2">
                                                                                                                              {" "}
                                                                                                                              <span>
                                                                                                                                <img
                                                                                                                                  src={
                                                                                                                                    trashIcon
                                                                                                                                  }
                                                                                                                                  alt=""
                                                                                                                                />
                                                                                                                              </span>{" "}
                                                                                                                              Delete
                                                                                                                              Answer
                                                                                                                            </Dropdown.Item>
                                                                                                                          </Dropdown.Menu>
                                                                                                                        </Dropdown>
                                                                                                                      </div>
                                                                                                                    </>
                                                                                                                  )
                                                                                                                })}


                                                                                                            {/* ----------------------------------------*/}
                                                                                                          </>
                                                                                                        )
                                                                                                      })}
                                                                                                </>
                                                                                              )
                                                                                            })}
                                                                                      </>
                                                                                    );
                                                                                  }
                                                                                )}
                                                                            </>
                                                                          );
                                                                        }
                                                                      )}
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </>
              );
            })}

          </Form>
        </>
      )}
    </div>
  );
};

export default React.memo(QuestionsandAnswers);
