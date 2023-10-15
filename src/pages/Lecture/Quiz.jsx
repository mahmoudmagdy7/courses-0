import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../../../public/site-config";
import Cookies from "js-cookie";
import { Button, Chip } from "@nextui-org/react";
import React from "react";
import { Radio, Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";

function Quiz() {
  const { quizId } = useParams();
  console.log(quizId);
  const [quiz, setQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [quizAnswers, setQuizAnswers] = useState([]);

  const selectedValue = useRef("");
  const quizAnswers = useRef([]);
  const handleRadioChange = (event) => {
    selectedValue.current = event.target.value;
    console.log(selectedValue.current);
  };

  async function getQuizData() {
    try {
      const { data } = await axios.get(siteConfig.ApiUrl + `/quiz-result/${quizId}`, {
        headers: {
          token: Cookies.get("userToken"),
        },
      });
      // debugger;
      setQuizResult(data.data);
      setQuiz(data.data.quiz);
    } catch (error) {
      console.log(error);
    }

    if (quizResult == null && quiz == null) {
      try {
        const { data } = await axios.get(siteConfig.ApiUrl + `/quizzes/${quizId}`, {
          headers: {
            token: Cookies.get("userToken"),
          },
        });
        setIsLoading(false);
        setQuiz(data.quiz);
      } catch (error) {}
    }
  }

  async function handleSubmit() {
    quizAnswers.current = [...quizAnswers.current, selectedValue.current];
    console.log(quizAnswers);
    setIsLoading(true);
    try {
      const { data } = await axios(siteConfig.ApiUrl + `/users/quiz/${quizId}/write`, {
        data: { answers: quizAnswers.current },
        method: "POST",
        headers: {
          token: Cookies.get("userToken"),
        },
      });
      console.log(data.data);
      try {
        const { data } = await axios.get(siteConfig.ApiUrl + `/quiz-result/${quizId}`, {
          headers: {
            token: Cookies.get("userToken"),
          },
        });
        setQuizResult(data.data);
      } catch (error) {}
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuizData();
    console.log(quizAnswers);
  }, [quizAnswers]);

  return (
    <section>
      {!isLoading && quizResult === null && quiz !== null ? (
        <>
          <h2>{quiz.name}</h2>
          <div className="flex gap-5 justify-center mt-4">
            {quiz.questions.map((q, index) => (
              <Chip key={q._id} color={currentQuestion >= index ? "secondary" : "warning"} variant="dot">
                {index + 1}
              </Chip>
            ))}
          </div>

          <div id="quiz-container" className="border-2 p-5 my-5 text w-1/2 m-auto text-start">
            <h4>{quiz.questions[currentQuestion]?.question}</h4>

            <List>
              {/* option A */}
              <ListItem className="p-0 ">
                <label htmlFor={quiz.questions[currentQuestion].optionA} className="flex gap-3 w-full cursor-pointer items-center px-3 py-2">
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="quiz"
                      value={"optionA"}
                      onChange={() => handleRadioChange(event)}
                      id={quiz.questions[currentQuestion].optionA}
                      ripple={false}
                      className="hover:before:opacity-0"
                      color="light-blue"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {quiz.questions[currentQuestion].optionA}
                  </Typography>
                </label>
              </ListItem>
              {/* option B */}
              <ListItem className="p-0 ">
                <label htmlFor={quiz.questions[currentQuestion].optionB} className="flex gap-3 w-full cursor-pointer items-center px-3 py-2">
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="quiz"
                      value={"optionB"}
                      onChange={() => handleRadioChange(event)}
                      id={quiz.questions[currentQuestion].optionB}
                      ripple={false}
                      className="hover:before:opacity-0"
                      color="light-blue"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {quiz.questions[currentQuestion].optionB}
                  </Typography>
                </label>
              </ListItem>
              {/* option C */}
              <ListItem className="p-0 ">
                <label htmlFor={quiz.questions[currentQuestion].optionC} className="flex gap-3 w-full cursor-pointer items-center px-3 py-2">
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="quiz"
                      value={"optionC"}
                      onChange={() => handleRadioChange(event)}
                      id={quiz.questions[currentQuestion].optionC}
                      ripple={false}
                      className="hover:before:opacity-0"
                      color="light-blue"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {quiz.questions[currentQuestion].optionC}
                  </Typography>
                </label>
              </ListItem>
              {/* option D */}
              <ListItem className="p-0 ">
                <label htmlFor={quiz.questions[currentQuestion].optionD} className="flex gap-3 w-full cursor-pointer items-center px-3 py-2">
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="quiz"
                      value={"optionD"}
                      onChange={() => handleRadioChange(event)}
                      id={quiz.questions[currentQuestion].optionD}
                      ripple={false}
                      className="hover:before:opacity-0"
                      color="light-blue"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {quiz.questions[currentQuestion].optionD}
                  </Typography>
                </label>
              </ListItem>
            </List>
          </div>
          <br />
          {currentQuestion !== quiz.questions.length - 1 ? (
            <Button
              id="nextQuestion"
              onClick={() => {
                quizAnswers.current = [...quizAnswers.current, selectedValue.current];
                setCurrentQuestion(currentQuestion + 1);
                console.log(quizAnswers);
              }}
              color="secondary"
            >
              السؤال التالي
            </Button>
          ) : (
            <Button onClick={handleSubmit} id="nextQuestion" color="success" endContent={""}>
              إنهاء الاختبار
            </Button>
          )}
        </>
      ) : quizResult !== null && quiz !== null ? (
        <div className="max-w-2xl m-auto ">
          <figure className=" flex justify-center">
            {((quizResult.score / quizResult.answeredQuestions.length) * 100).toFixed(1) >= 90 ? (
              <img src="/assets/quiz/gold.png" width={"175px"} alt="excellent" />
            ) : ((quizResult.score / quizResult.answeredQuestions.length) * 100).toFixed(1) >= 75 ? (
              <img src="/assets/quiz/silver.png" width={"175px"} alt="Very Good" />
            ) : ((quizResult.score / quizResult.answeredQuestions.length) * 100).toFixed(1) >= 50 ? (
              <img src="/assets/quiz/bronze.png" width={"175px"} alt="Good" />
            ) : (
              <img src="/assets/quiz/Fail.png" width={"175px"} alt="Good" />
            )}
          </figure>
          <div className="quiz-results mb-5 ct-1 font-semibold">
            <h2>
              لديك <span className="ct-primary">{quizResult.score}</span> إجابة صحيحه من اصل <span className="ct-0">{quizResult.answeredQuestions.length}</span>
              سؤال
            </h2>
            <h2>
              النسبة المئوية : <span className="ct-0">{((quizResult.score / quizResult.answeredQuestions.length) * 100).toFixed(1) + "%"}</span>
            </h2>
            <div className="flex gap-4 justify-center my-3">
              {quizResult.answeredQuestions.map((q, index) =>
                q.isCorrect ? (
                  <Chip variant="flat" key={index} className="   flex" color="success">
                    {/* <span className="flex gap-1">
                      <span>
                        <CheckIcon height={18} size={18} />
                      </span> */}
                    {index + 1}
                    {/* </span> */}
                  </Chip>
                ) : (
                  <Chip key={index} variant="flat" color="danger">
                    {/* <span className="flex gap-1">
                      <span>
                        <XMarkIcon height={18} size={18} />
                      </span> */}
                    {index + 1}
                    {/* </span> */}
                  </Chip>
                )
              )}
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <span className="flex items-center gap-1">
                صحيح
                <Chip variant="flat" className=" block w-5 h-5" color="success"></Chip>
              </span>{" "}
              <span className="flex items-center gap-1">
                خطأ
                <Chip variant="flat" className=" block w-5 h-5" color="danger"></Chip>
              </span>{" "}
            </div>
          </div>
          <div>
            {quizResult.quiz.questions.map((q, index) => {
              return (
                <div key={index} className="text-start border-b-3 mb-4">
                  <h4 className="ct-primary text-lg ">
                    <span className="font-semibold"> {index + 1}.</span> {q?.question}
                  </h4>
                  <List>
                    {/* option A */}
                    <ListItem
                      disabled={
                        (q?.correctAnswer !== "optionA" && quizResult.studentAnswers[index] == "optionA") ||
                        (q?.correctAnswer == "optionA" && quizResult.studentAnswers[index] !== "optionA") ||
                        (q?.correctAnswer == "optionA" && quizResult.studentAnswers[index] == "optionA")
                          ? false
                          : true
                      }
                      className="p-0 "
                    >
                      <label
                        htmlFor={"optionA" + index}
                        className={`flex gap-3 w-full cursor-pointer items-center px-3 py-2 hover:cursor-default
                          ${q?.correctAnswer == "optionA" ? "bg-success-100 rounded-lg" : ""}
                          ${
                            quizResult.studentAnswers[index] !== q?.correctAnswer && quizResult.studentAnswers[index] == "optionA"
                              ? "bg-danger-50 rounded-lg"
                              : ""
                          }
                        `}
                      >
                        <ListItemPrefix className="mr-3 ">
                          <Radio
                            name={"quiz-answer" + index}
                            id={"optionA" + index}
                            ripple={false}
                            checked={q?.correctAnswer == "optionA" ? true : false}
                            className="hover:before:opacity-0"
                            color="light-blue"
                            disabled
                            containerProps={{
                              className: "p-0",
                            }}
                            onChange={() => ""}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {quizResult.quiz?.questions[index].optionA}
                        </Typography>
                      </label>
                    </ListItem>
                    {/* option B */}
                    <ListItem
                      disabled={
                        (q?.correctAnswer !== "optionB" && quizResult.studentAnswers[index] == "optionB") ||
                        (q?.correctAnswer == "optionB" && quizResult.studentAnswers[index] !== "optionB") ||
                        (q?.correctAnswer == "optionB" && quizResult.studentAnswers[index] == "optionB")
                          ? false
                          : true
                      }
                      className="p-0 "
                    >
                      <label
                        htmlFor={"optionB" + index}
                        className={`flex gap-3 w-full cursor-pointer items-center px-3 py-2 hover:cursor-default
                          ${q?.correctAnswer == "optionB" ? "bg-success-100 rounded-lg" : ""}
                          ${
                            quizResult.studentAnswers[index] !== q?.correctAnswer && quizResult.studentAnswers[index] == "optionB"
                              ? "bg-danger-50 rounded-lg"
                              : ""
                          }
                        `}
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            name={"quiz-answer" + index}
                            id={"optionB" + index}
                            ripple={false}
                            checked={q?.correctAnswer == "optionB" ? true : false}
                            className="hover:before:opacity-0"
                            color="light-blue"
                            disabled
                            containerProps={{
                              className: "p-0",
                            }}
                            onChange={() => ""}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {quiz?.questions[index]?.optionB}
                        </Typography>
                      </label>
                    </ListItem>
                    {/* option C */}
                    <ListItem
                      disabled={
                        (q?.correctAnswer !== "optionC" && quizResult.studentAnswers[index] == "optionC") ||
                        (q?.correctAnswer == "optionC" && quizResult.studentAnswers[index] !== "optionC") ||
                        (q?.correctAnswer == "optionC" && quizResult.studentAnswers[index] == "optionC")
                          ? false
                          : true
                      }
                      className="p-0 "
                    >
                      <label
                        htmlFor={"optionC" + index}
                        className={`flex gap-3 w-full cursor-pointer items-center px-3 py-2 hover:cursor-default
                          ${q?.correctAnswer == "optionC" ? "bg-success-100 rounded-lg" : ""}
                          ${
                            quizResult.studentAnswers[index] !== q?.correctAnswer && quizResult.studentAnswers[index] == "optionC"
                              ? "bg-danger-50 rounded-lg"
                              : ""
                          }
                        `}
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            name={"quiz-answer" + index}
                            id={"optionC" + index}
                            ripple={false}
                            checked={q?.correctAnswer == "optionC" ? true : false}
                            className="hover:before:opacity-0"
                            color="light-blue"
                            containerProps={{
                              className: "p-0",
                            }}
                            onChange={() => ""}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {quizResult?.quiz.questions[index].optionC}
                        </Typography>
                      </label>
                    </ListItem>
                    {/* option D */}
                    <ListItem
                      disabled={
                        (q?.correctAnswer !== "optionD" && quizResult.studentAnswers[index] == "optionD") ||
                        (q?.correctAnswer == "optionD" && quizResult.studentAnswers[index] !== "optionD") ||
                        (q?.correctAnswer == "optionD" && quizResult.studentAnswers[index] == "optionD")
                          ? false
                          : true
                      }
                      className="p-0 "
                    >
                      <label
                        htmlFor={"optionD" + index}
                        className={`flex gap-3 w-full cursor-pointer items-center px-3 py-2 hover:cursor-default
                          ${q?.correctAnswer == "optionD" ? "bg-success-100 rounded-lg" : ""}
                          ${
                            quizResult.studentAnswers[index] !== q?.correctAnswer && quizResult.studentAnswers[index] == "optionD"
                              ? "bg-danger-50 rounded-lg"
                              : ""
                          }
                        `}
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            name={"quiz-answer" + index}
                            id={"optionD" + index}
                            ripple={false}
                            disabled
                            checked={q?.correctAnswer == "optionD" ? true : false}
                            className="hover:before:opacity-0"
                            color="light-blue"
                            containerProps={{
                              className: "p-0",
                            }}
                            onChange={() => ""}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {quizResult?.quiz.questions[index].optionD}
                        </Typography>
                      </label>
                    </ListItem>
                  </List>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        "loading"
      )}
    </section>
  );
}

export default Quiz;
