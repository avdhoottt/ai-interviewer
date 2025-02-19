// components/MessageList.tsx
export function MessageList({ messages }) {
  return (
    <div className="space-y-6">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.type === "response" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.type !== "response" && (
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          )}

          <div
            className={`max-w-[85%] ${
              msg.type === "response" ? "ml-auto" : ""
            }`}
          >
            {msg.type === "question" && (
              <div className="text-sm text-gray-500 mb-1 font-medium">
                AI Interviewer
              </div>
            )}

            <div
              className={`rounded-2xl px-4 py-3 ${
                msg.type === "question"
                  ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-sm"
                  : msg.type === "feedback"
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
              }`}
            >
              {msg.type === "feedback" && (
                <div className="flex items-center space-x-1 text-sm font-medium text-blue-600 mb-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Feedback</span>
                </div>
              )}

              <div
                className={`${
                  msg.type === "feedback" ? "text-gray-700 space-y-2" : ""
                }`}
              >
                {msg.content}
              </div>
            </div>

            {msg.type === "response" && (
              <div className="text-sm text-gray-500 mt-1 text-right font-medium">
                You
              </div>
            )}
          </div>

          {msg.type === "response" && (
            <div className="flex-shrink-0 ml-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {/* You can replace this with the first letter of the user's name */}
                Y
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
