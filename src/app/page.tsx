// app/page.tsx
"use client";

import { useState } from "react";
import { ContextForm } from "../components/ContextForm";
import { Interview } from "../components/Interview";

export default function Home() {
  const [context, setContext] = useState(null);

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            AI Interview Coach
          </h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!context ? (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Prepare for Your Next Interview
              </h2>
              <p className="text-gray-600">
                Get real-time feedback and improve your interview skills with
                AI-powered coaching
              </p>
            </div>
            <ContextForm onSubmit={setContext} />
          </div>
        ) : (
          <Interview context={context} />
        )}
      </div>
    </main>
  );
}
