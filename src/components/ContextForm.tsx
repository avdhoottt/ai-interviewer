// components/ContextForm.tsx
import { useState } from "react";

export function ContextForm({ onSubmit }) {
  const [context, setContext] = useState({
    role: "",
    yearsOfExperience: "",
    keySkills: "",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(context);
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Role
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={context.role}
            onChange={(e) => setContext({ ...context, role: e.target.value })}
            className="w-full px-4 py-3 rounded-lg text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            placeholder="e.g. 3"
            value={context.yearsOfExperience}
            onChange={(e) =>
              setContext({ ...context, yearsOfExperience: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Skills
          </label>
          <input
            type="text"
            placeholder="e.g. React, TypeScript, Node.js"
            value={context.keySkills}
            onChange={(e) =>
              setContext({ ...context, keySkills: e.target.value })
            }
            className="w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <p className="mt-2 text-sm text-gray-500">
            Separate skills with commas
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Start Interview
        </button>
      </form>
    </div>
  );
}
