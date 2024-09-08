# MovieQuiz-App



![Quizzical App](https://github.com/user-attachments/assets/c7cf3c28-1288-4078-993e-61b92fadfd25)

Quiz Application
Overview
A React-based quiz application that fetches questions from the Open Trivia Database API.
Allows users to select answers, submit the quiz, and view their results.
Features functionality for displaying correct and incorrect answers after submission.
Technologies Used
React: JavaScript library for building user interfaces.
CSS: Styling for the application, including custom classes for handling different states of answer choices.
HTML Entities: html-entities library for decoding HTML entities in quiz questions and answers.
Features
Start Quiz: Begin the quiz with a click of a button.
Answer Selection: Users can select answers for each question.
Submit Quiz: Check answers and receive feedback on correctness.
Results Display: After submission, see which answers were correct (green) and which were wrong (red).
Play Again: Option to restart the quiz and reset answers and scores.
Responsive Design: Adapts to various screen sizes and devices.
Functionality
Fetch Questions: Retrieves a set of quiz questions from the Open Trivia Database API.
Answer Handling: Users can select answers, which are tracked and stored.
Result Calculation: On submission, the app calculates and displays the number of correct answers.
UI Feedback: Correct answers are highlighted in green, while incorrect answers are highlighted in red.
State Management: Utilizes React state to manage the quiz flow, including starting the quiz, submitting answers, and showing results.
How to Run
Clone the repository: git clone <repository-url>
Navigate to the project directory: cd <project-directory>
Install dependencies: npm install
Start the application: npm start
