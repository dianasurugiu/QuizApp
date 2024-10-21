import { useState } from 'react';

const AddQuestionPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      text: questionText,
      options: options,
      correct: correctAnswer,
    };

    try {
      
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        setMessage('Întrebarea a fost adăugată cu succes!');
        setQuestionText('');
        setOptions(['', '']);
        setCorrectAnswer(0);
      } else {
        throw new Error('Eroare la adăugarea întrebării');
      }
    } catch (error) {
      setMessage('Eroare: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Adaugă Întrebare</h1>
      <form onSubmit={handleSubmit} className="add-question-form">
        <div>
          <label>
            Întrebare:
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>Opțiuni:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="option-input"
              />
              <label>
                <input
                  type="radio"
                  checked={correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                />
                Răspuns corect
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Adaugă opțiune
          </button>
        </div>
        <button type="submit">Adaugă Întrebare</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddQuestionPage;
