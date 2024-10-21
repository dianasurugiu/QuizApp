import fs from 'fs';
import path from 'path';

const questionsPath = path.join(process.cwd(), 'public', 'questions.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
   
    fs.readFile(questionsPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Eroare la citirea fișierului' });
      }

      const questions = JSON.parse(data);
      res.status(200).json(questions); 
    });
  } else if (req.method === 'POST') {
    const newQuestion = req.body;

    
    fs.readFile(questionsPath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Eroare la citirea fișierului' });
      }

      const questions = JSON.parse(data);

      
      questions.push({
        id: questions.length + 1,
        category: 'Intrebari noi', 
        questions: [newQuestion],
      });

      
      fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Eroare la salvarea fișierului' });
        }
        res.status(201).json({ message: 'Întrebare adăugată cu succes' });
      });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metoda ${req.method} nu este permisă`);
  }
}
