import React from "react";

export default function Quiz({submitted, userResult, index, question, selectedAnswer, setSelectedAnswer, correctAnswer }) {

    const handleChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const getChoiceClass = (choice) => {
        if (!submitted) return ''; // No special class before submission

        if (choice === correctAnswer) {
            return 'correct'; // Green for correct answers
        } else if (choice === selectedAnswer) {
            return 'wrong'; // Red for incorrect selected answers
        }
        return '';
    };

    return (
        <div className="question--container">
            <h2 className="question">{question.question}</h2>
            <div className="choices">
                {question.choices.map((choice, i) => (
                    <label
                        key={i}
                        className={`choice-button ${getChoiceClass(choice)} ${selectedAnswer === choice ? 'selected' : ''}`}
                    >
                        <input
                            type="radio"
                            name={`question-${index}`}
                            value={choice}
                            checked={selectedAnswer === choice}
                            onChange={!submitted ? handleChange : undefined} // Disable onChange if submitted
                            className="hidden-radio"
                            disabled={submitted} // Disable radio buttons after submission
                        />
                        {choice}
                    </label>
                ))}
            </div>
        </div>
    );
}

