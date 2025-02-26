import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>Joke Danger Meter - Check if your joke is safe or offensive!</title>
        <meta name="description" content="Use our Joke Danger Meter to check if your joke might be offensive. Get instant feedback and avoid awkward moments with our fun and interactive tool!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-black to-red-900 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl shadow-red-500/20 p-4 sm:p-6 md:p-8 max-w-2xl w-full relative border border-red-500/10">
          {/* Jail Meter - Hidden on small mobile, visible on larger screens */}
          <div className="hidden sm:block absolute left-[-40px] md:left-[-60px] top-1/2 transform -translate-y-1/2 w-8 md:w-12 h-48 md:h-64 bg-zinc-800 rounded-full overflow-hidden shadow-lg shadow-red-500/20">
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

          {/* Mobile Meter - Horizontal at the top for small screens */}
          <div className="sm:hidden w-full h-8 bg-zinc-800 rounded-full overflow-hidden shadow-lg shadow-red-500/20 mb-6">
            <div 
              className={`h-full transition-all duration-500 ease-in-out ${getMeterColor()}`}
              style={{ 
                width: `${dangerLevel}%`,
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-5 rounded-full" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500">Joke Danger Meter</h1>
            <Theater className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
          </div>
          
          <p className="text-center text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-red-400">
            Find out if your joke is safe or offensive! 😅
          </p>

          <div className="space-y-4 md:space-y-5">
            {questions.map((question, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-zinc-900/50 border border-red-500/10"
              >
                <p className="text-sm sm:text-base md:text-lg text-red-100 mb-3 sm:mb-0">{question.text}</p>
                <div className="flex gap-3 self-end sm:self-auto">
                  <button
                    onClick={() => handleAnswer(index, false)}
                    className={`flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
                      !question.isYes
                        ? 'bg-green-500 text-white'
                        : 'bg-zinc-800 text-red-200 border border-red-500/20'
                    }`}
                  >
                    No
                  </button>
                  <button
                    onClick={() => handleAnswer(index, true)}
                    className={`flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-2 text-sm sm:text-base rounded-lg transition-all ${
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
            className="mt-6 md:mt-8 w-full bg-red-500 text-white py-3 md:py-3.5 rounded-xl text-lg md:text-xl font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            Check Result
          </button>

          {/* Mobile Danger Level Display */}
          <div className="sm:hidden mt-4 text-center">
            <p className="text-red-300 text-sm">
              Danger Level: {Math.round(dangerLevel)}%
            </p>
          </div>

          {/* Creator Text */}
          <div className="mt-6 text-center">
            <p className="text-red-400/60 text-xs">
              Created by Innocent Devil
            </p>
          </div>

          {/* Result Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm z-50">
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 sm:p-8 max-w-xs sm:max-w-sm md:max-w-md w-full text-center relative border border-red-500/10 shadow-2xl shadow-red-500/20">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-3"
                >
                  ✕
                </button>
                <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-red-500" />
                <p className="text-xl sm:text-2xl font-bold mb-4 text-red-400">{result}</p>
                <p className="text-red-300">
                  Danger Level: {Math.round(dangerLevel)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
