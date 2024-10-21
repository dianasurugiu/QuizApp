import { useEffect, useState } from 'react';

function CategoriesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message); 
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categorii</h1>
      {error && <p>Error: {error}</p>} 
      <ul className="category-list">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="category-link">
            <a href={`/quiz/${quiz.id}`}>{quiz.category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
