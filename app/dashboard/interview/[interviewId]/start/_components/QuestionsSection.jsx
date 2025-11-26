import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion = [], activeQuestionIndex = 0, setActiveQuestionIndex }) {

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-colors">
        {/* Question selector grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mockInterviewQuestion.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveQuestionIndex && setActiveQuestionIndex(index)}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-center cursor-pointer transition-all duration-200 ${
                activeQuestionIndex === index
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              }`}
            >
              Q{index + 1}
            </button>
          ))}
        </div>

        {/* Active question section */}
        {mockInterviewQuestion.length > 0 && (
          <div className="mt-6 p-5 border border-indigo-200 dark:border-indigo-800 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 relative">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-semibold text-base text-indigo-600 dark:text-indigo-400">
                Question {activeQuestionIndex + 1}
              </h3>
              <button
                onClick={() =>
                  textToSpeech(
                    mockInterviewQuestion[activeQuestionIndex]?.question
                  )
                }
                className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </button>
            </div>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
              {mockInterviewQuestion[activeQuestionIndex]?.question ||
                "Question text not available."}
            </p>
          </div>
        )}

        {/* Note Section */}
        <div className="mt-6 border border-amber-200 dark:border-amber-800 rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20">
          <h2 className="flex gap-2 items-center text-amber-800 dark:text-amber-300 mb-2 font-medium">
            <Lightbulb className="w-5 h-5" />
            <span>Note:</span>
          </h2>
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            Enable your webcam and microphone to start the AI-generated mock
            interview. It includes 5 questions. After completing them, you'll
            receive a performance report based on your answers.
            <br />
            <span className="font-semibold mt-1 block">
              We never record your video; you can disable webcam access anytime.
            </span>
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
