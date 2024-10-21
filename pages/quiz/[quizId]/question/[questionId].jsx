import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function QuestionPage() {
  const router = useRouter();
  const { quizId, questionId } = router.query;
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/questions');
      const data = await response.json();
      const selectedQuiz = data.find((quiz) => quiz.id === quizId);
      const selectedQuestion = selectedQuiz.questions[questionId - 1];
      setQuestion(selectedQuestion);
    };

    if (quizId && questionId) {
      fetchData();
    }
  }, [quizId, questionId]);

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h1>{question.question}</h1>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <button onClick={() => router.push(`/quiz/${quizId}`)}>Înapoi la Quiz</button>
    </div>
  );
}

export default QuestionPage;
