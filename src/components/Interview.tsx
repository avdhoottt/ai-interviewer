import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MessageList } from "./MessageList";

export function Interview({ context }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newSocket = io("/", {
      path: "/api/socket",
    });

    newSocket.on("connect", () => {
      setIsLoading(true);
      newSocket.emit("start_interview", context);
    });

    newSocket.on("question", (question) => {
      setMessages((prev) => [...prev, { type: "question", content: question }]);
      setIsLoading(false);
    });

    newSocket.on("feedback", (feedback) => {
      setMessages((prev) => [...prev, { type: "feedback", content: feedback }]);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [context]);

  const handleSubmit = () => {
    if (!response.trim() || isLoading) return;

    setIsLoading(true);
    socket.emit("submit_response", { response, context });
    setMessages((prev) => [...prev, { type: "response", content: response }]);
    setResponse("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border">
        <div className="border-b px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Technical Interview Session
              </h2>
              <p className="text-sm text-gray-500">Role: {context.role}</p>
            </div>
          </div>
        </div>

        <div className="h-[600px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
          <MessageList messages={messages} />
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
            </div>
          )}
        </div>

        <div className="border-t p-4 bg-white">
          <div className="flex space-x-4">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 p-4 rounded-xl border text-black border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none bg-gray-50 placeholder-gray-400"
              rows={3}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed h-fit self-end"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
