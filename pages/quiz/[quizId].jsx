import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const router = useRouter();
  const { quizId } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isQuizFinished, setIsQuizFinished] = useState(false); 

  useEffect(() => {
    if (quizId) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/questions');
          const data = await response.json();
          const selectedQuiz = data.find((q) => q.id === parseInt(quizId));
          setQuiz(selectedQuiz);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [quizId]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];

    
    if (selectedOption === currentQuestion.correct) {
      setScore(score + 1);
      setFeedback('Corect!');
    } else {
      setFeedback('Greșit! Răspunsul corect era: ' + currentQuestion.options[currentQuestion.correct]);
    }

    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      
      setIsQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback('');
    setSelectedOption(null);
    setIsQuizFinished(false); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  if (isQuizFinished) {
    return (
      <div>
        <h1>Quiz Terminat!</h1>
        <p>Scorul tău este: {score} / {quiz.questions.length}</p>
        <button onClick={resetQuiz}>Începe din nou</button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.category} Quiz</h1>
      <div className="question">
        <p>{currentQuestion.text}</p>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              className={`option ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionClick(index)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedOption === index ? '#0070f3' : 'transparent',
                color: selectedOption === index ? 'white' : 'black',
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextQuestion} disabled={selectedOption === null}>
        Întrebare următoare
      </button>
      {feedback && <div className="feedback">{feedback}</div>} 
    </div>
  );
};

export default QuizPage;
