import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

// Liste des questions améliorée avec plus de détails
const questions = [
  { question: "🖥️ Travailles-tu principalement sur un ordinateur ?", key: "computer" },
  { question: "👕 Portes-tu un uniforme pour travailler ?", key: "uniform" },
  { question: "💰 Ton travail paye bien (selon toi) ?", key: "salary" },
  { question: "🔄 Ton travail implique-t-il des tâches répétitives ?", key: "repetitive" },
  { question: "🎤 Parles-tu souvent en public ?", key: "publicSpeaking" },
  { question: "📦 As-tu souvent des choses physiques à transporter ?", key: "physical" },
  { question: "💡 Ton travail demande-t-il beaucoup de créativité ?", key: "creative" },
  { question: "📊 As-tu souvent des réunions et des rapports à rédiger ?", key: "meetings" },
  { question: "🏠 Peux-tu travailler à distance ?", key: "remote" },
  { question: "⚠️ Ton travail comporte-t-il des risques physiques ?", key: "dangerous" },
  { question: "✈️ Doit-on souvent voyager pour ton travail ?", key: "travel" },
  { question: "🕐 As-tu des horaires flexibles ?", key: "flexibleHours" },
  { question: "📚 Ton métier implique-t-il beaucoup de formation et d’études ?", key: "education" },
  { question: "👥 Travailles-tu beaucoup avec des gens (clients, élèves, patients) ?", key: "social" },
];

// Liste des métiers avec des conditions plus précises
const results = [
  { type: "Développeur 💻", conditions: { computer: true, remote: true, creative: true } },
  { type: "Médecin 🏥", conditions: { computer: false, uniform: true, social: true, dangerous: true } },
  { type: "Dentiste 🦷", conditions: { uniform: true, social: true, repetitive: true, education: true } },
  { type: "Professeur 👨‍🏫", conditions: { publicSpeaking: true, social: true, education: true } },
  { type: "RH 🏢", conditions: { computer: true, meetings: true, social: true } },
  { type: "Financier 💰", conditions: { computer: true, salary: true, meetings: true } },
  { type: "Ingénieur Aérien ✈️", conditions: { education: true, computer: true, travel: true, dangerous: true } },
  { type: "Livreur 🚲", conditions: { physical: true, uniform: true, repetitive: true } },
  { type: "Comédien 🎭", conditions: { publicSpeaking: true, repetitive: false, creative: true } },
  { type: "Journaliste 📰", conditions: { publicSpeaking: true, travel: true, creative: true } },
  { type: "Pilote d'Avion ✈️", conditions: { uniform: true, travel: true, dangerous: true } },
  { type: "Agent Secret 🕵️", conditions: { travel: true, dangerous: true, flexibleHours: true } },
  { type: "Électricien ⚡", conditions: { physical: true, dangerous: true, meetings: false } },
  { type: "Artiste 🎨", conditions: { creative: true, computer: false, uniform: false } },
  { type: "Entrepreneur 🚀", conditions: { meetings: true, creative: true, flexibleHours: true } },
  { type: "Espion 🕵️", conditions: {} }, // Cas joker 😆
];

const App = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [job, setJob] = useState<string | null>(null);

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[step].key;
    setAnswers({ ...answers, [currentQuestion]: answer });

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      determineJob();
    }
  };

  const determineJob = () => {
    const foundJob = results.find((res) =>
      Object.entries(res.conditions).every(([key, value]) => answers[key] === value)
    );
    setJob(foundJob ? foundJob.type : "Espion 🕵️");
  };

  return (
    <div className="app-container">
      {job ? (
        <motion.div className="result-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2>🧐 Ton métier probable est...</h2>
          <h1>{job}</h1>
          <button onClick={() => { setStep(0); setAnswers({}); setJob(null); }}>🔄 Recommencer</button>
        </motion.div>
      ) : (
        <motion.div className="question-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 dangerouslySetInnerHTML={{ __html: questions[step].question }} />
          <div className="buttons">
            <button onClick={() => handleAnswer(true)}>✅ Oui</button>
            <button onClick={() => handleAnswer(false)}>❌ Non</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
