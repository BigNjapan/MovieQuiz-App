import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import { decode } from 'html-entities';

export default function App() {
    const [start, setStart] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Keep track of correct answers

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                const decodedResults = data.results.map(question => {
                    const decodedCorrectAnswer = decode(question.correct_answer);
                    const decodedIncorrectAnswers = question.incorrect_answers.map(decode);

                    let choices = [decodedCorrectAnswer, ...decodedIncorrectAnswers].sort(() => Math.random() - 0.5);

                    return {
                        ...question,
                        question: decode(question.question),
                        correct_answer: decodedCorrectAnswer,
                        choices
                    };
                });
                setQuestions(decodedResults);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const startQuiz = () => {
        setStart(true);
        setSubmitted(false); 
        setSelectedAnswers({});
        setCorrectAnswersCount(0); // Reset correct answers count
    };

    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answer
        }));
    };

    const handleSubmit = () => {
        setSubmitted(true); // Set submitted to true once the quiz is submitted
        
        // Calculate the score after submission
        const score = questions.reduce((acc, question, index) => {
            return acc + (selectedAnswers[index] === question.correct_answer ? 1 : 0);
        }, 0);

        setCorrectAnswersCount(score); // Set the correct answers count
    };

    const handlePlayAgain = () => {
        // Restart the quiz, reset everything
        setStart(false);
        setSubmitted(false);
        setSelectedAnswers({});
        setCorrectAnswersCount(0); // Reset score
    };

    const quizElements = questions.map((quest, index) => (
        <Quiz
            key={index}
            index={index}
            question={quest}
            selectedAnswer={selectedAnswers[index] || ''}
            setSelectedAnswer={answer => handleAnswerChange(index, answer)}
            correctAnswer={submitted ? quest.correct_answer : null} 
            submitted={submitted} // Use this to control color changes and other UI behaviors
        />
    ));

    return (
        <main> 
            {!start 
                ? 
                <div className="start">
                    <h1 className="start--title">Quizzical</h1>
                    <p className="start--description">Answer 5 questions about Movies!</p>
                    <button className="start--btn" onClick={startQuiz}>Start Quiz</button>
                </div> 
                : 
                <div className="questions">
                    {quizElements}
                    <div className="results--container">
                        {!submitted ? (
                            <button className="submit-btn" onClick={handleSubmit}>Check Answers</button>
                        ) : (
                        <div className="after--submit">
                            <p className="result">You scored {correctAnswersCount}/{questions.length} correct answers</p>
                            <button className="play-again-btn" onClick={handlePlayAgain}>Play Again</button>
                        </div>
                        )}
                    </div>
                </div>}

            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
        </main>
    );
}

