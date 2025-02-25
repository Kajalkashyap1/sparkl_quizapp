import { useState } from "react";

const CreateQuizStep2 = () => {
  const [questions, setQuestions] = useState(
    Array(10).fill({ text: "", marks: "", qid: "" })
  );

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    console.log("Submitted Questions:", questions);
    // API call to save questions can be added here
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h2 className="font-semibold text-lg">
          Hi, Admin | <span className="text-blue-500 cursor-pointer">Logout</span>
        </h2>
        <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-lg font-bold">
          A
        </div>
      </div>

      {/* Navbar */}
      <div className="mt-4 bg-white w-full max-w-lg p-4 rounded-md shadow-md flex space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded-md">Dashboard</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Quiz</button>
      </div>

      {/* Quiz Step 2 */}
      <div className="mt-6 bg-white w-full max-w-lg p-6 rounded-md shadow-md">
        <h3 className="font-semibold text-lg mb-4">Create Quiz Step 2</h3>

        <div className="grid grid-cols-3 gap-4">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={`Q${index + 1}`}
                readOnly
                className="w-12 p-2 text-center bg-gray-200 rounded-md"
              />
              <input
                type="number"
                placeholder="Marks"
                value={q.marks}
                onChange={(e) => handleChange(index, "marks", e.target.value)}
                className="w-20 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="#QID"
                value={q.qid}
                onChange={(e) => handleChange(index, "qid", e.target.value)}
                className="w-16 p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateQuizStep2;
