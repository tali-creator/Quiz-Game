// import { useState } from 'react'
import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./component/Nav";
import "@fortawesome/fontawesome-free/css/all.css";
import Questions from "./component/Questions";
import Loading from "./component/Loading";

function App() {
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("white");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [finish, setfinish] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // function to fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/API/questions.json");

        if (!res.ok) {
          throw Error("Failed to fetch Questions");
        }

        const data = await res.json();
        setQuestions(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //go to next question
  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  // go to previous question
  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  //change theme
  function handleTheme() {
    setTheme((prev) => (prev = !prev));
  }

  // function to calculate score
  function handleScore(answer , questionId) {
    const selectedAnswer = answer.target.value;
    const correctAnswer = questions[currentQuestion]?.correctAnswer;

    const storedAwnswer = JSON.parse(localStorage.getItem("savedAnswers")) || {}
    storedAwnswer[currentQuestion] = selectedAnswer;
    localStorage.setItem("savedAnswers", JSON.stringify(storedAwnswer) )

    if (selectedAnswers[questionId]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
    
    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    console.log("score ", score);
    console.log("correct answer", correctAnswer);
  }

  function handleFinish() {
    setLoading(true)
    setTimeout(() => {
      setFinalScore(score);
      setCurrentQuestion(null)
      setLoading(false)
      setfinish(true)
      setLoading(false)
    }, 1000);
  }

  // setTimeout(() => {
  //   handleFinish()
  // }, 20000);

  function restart() {
    setLoading(true)
    setTimeout(() => {
      setfinish(false)
      setScore(0)
      setFinalScore(0),
      setCurrentQuestion(0),
      localStorage.removeItem("savedAnswers")
      setSelectedAnswers(0)
      setLoading(false)
    }, 1000);
  }

  return (
    <div
      className={`w-full h-screen   flex flex-col ${ theme ? "bg-white" : "bg-black/80" } ${ theme ? "text-black/80" : "text-white/80" } justify-center items-center p-5`}>
      <div className="fixed top-5 w-full">

      <Nav theme={handleTheme} toggle={theme} />
      </div>
      <main className="w-full">
        {loading && <Loading toggle={theme} />}
        {error && (
          <div className="w-full h-full text-3xl flex items-center justify-center">
            {error}
          </div>
        )}
        {currentQuestion < questions.length &&
          <Questions
            handleScore={handleScore}
            toggle={theme}
            questions={questions[currentQuestion]}
            handleBack={handleBack}
            handleNext={handleNext}
            handleFinish={handleFinish}
          />
        }
      </main>
      {finish  && (
        <div className="space-y-4">
          <div>
          score {finalScore}/{questions.length}
          </div>
          <button onClick={restart} className="py-1 px-3 cursor-pointer text-white shadow-md font-black bg-blue-400 rounded-lg ">Restart</button>
        </div>)
      }

      <div className="fixed w-full bottom-0 py-5 text-center flex flex-col"> <span className="font-bold">created by Tali Nanzing Moses</span> <span>&copy;copyright 2024</span> </div>
    </div>
  );
}

export default App;
