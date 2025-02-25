import React, { useState } from 'react';
import { Theater, AlertTriangle } from 'lucide-react';

interface Question {
  text: string;
  isYes: boolean;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([
    { text: "Is your joke about a political party?", isYes: false },
    { text: "Does your joke involve religion?", isYes: false },
    { text: "Is it a dark humor joke?", isYes: false },
    { text: "Does it target a specific gender?", isYes: false },
    { text: "Is your joke about someone's mom/dad?", isYes: false },
    { text: "Is it a joke about a taboo topic?", isYes: false },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");

  const totalYes = questions.filter(q => q.isYes).length;
  const dangerLevel = (totalYes / questions.length) * 100;

  const handleAnswer = (index: number, isYes: boolean) => {
    const newQuestions = [...questions];
    newQuestions[index].isYes = isYes;
    setQuestions(newQuestions);
  };

  const checkResult = () => {
    let message = "";
    if (totalYes === 6) {
      message = "🚨 Police incoming! You're going to jail! 🚔";
    } else if (totalYes >= 4) {
      message = "⚠️ Highly offensive! Maybe reconsider?";
    } else if (totalYes >= 2) {
      message = "😬 Proceed with caution...";
    } else {
      message = "✅ Your joke seems safe!";
    }
    setResult(message);
    setShowPopup(true);
  };

  const getMeterColor = () => {
    if (dangerLevel <= 33) return "bg-green-500";
    if (dangerLevel <= 66) return "bg-yellow-500";
    return "bg-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl shadow-red-500/20 p-8 max-w-2xl w-full relative border border-red-500/10">
        {/* Jail Meter */}
        <div className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-64 bg-zinc-800 rounded-full overflow-hidden shadow-lg shadow-red-500/20">
          <div 
            className={`w-full transition-all duration-500 ease-in-out ${getMeterColor()}`}
            style={{ 
              height: `${dangerLevel}%`,
              position: 'absolute',
              bottom: 0
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-4xl font-bold text-red-500">Joke Danger Meter</h1>
          <Theater className="w-8 h-8 text-red-500" />
        </div>
        
        <p className="text-center text-xl mb-8 text-red-400">
          Find out if your joke is safe or offensive! 😅
        </p>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-red-500/10">
              <p className="text-lg text-red-100">{question.text}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAnswer(index, false)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    !question.isYes
                      ? 'bg-green-500 text-white'
                      : 'bg-zinc-800 text-red-200 border border-red-500/20'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => handleAnswer(index, true)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    question.isYes
                      ? 'bg-red-500 text-white'
                      : 'bg-zinc-800 text-red-200 border border-red-500/20'
                  }`}
                >
                  Yes
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={checkResult}
          className="mt-8 w-full bg-red-500 text-white py-3 rounded-xl text-xl font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
        >
          Check Result
        </button>

        {/* Result Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 max-w-md w-full text-center relative border border-red-500/10 shadow-2xl shadow-red-500/20">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <p className="text-2xl font-bold mb-4 text-red-400">{result}</p>
              <p className="text-red-300">
                Danger Level: {Math.round(dangerLevel)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="absolute bottom-4 right-4 text-red-500 text-sm opacity-75">
  Created by <span className="font-semibold">InnocentDevil</span>
</div>
  );
}

export default App;
