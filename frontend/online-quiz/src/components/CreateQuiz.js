import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const navigate = useNavigate();

  // Retrieve token from localStorage on component mount
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // State for quiz data
  const [quizData, setQuizData] = useState({
    title: "",
    questions: "",
    score: "",
    duration: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setLoading(false);
    } else {
      alert("You are not logged in!");
      navigate("/"); // Redirect to login if token is missing
    }
  }, [navigate]);


  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    console.log("Stored Token Before API Call:", token);
    console.log("Quiz Data:", quizData);

    if (!token) {
      alert("You are not logged in!");
      return;
    }

    try {

      const response = await fetch("http://localhost:8000/api/quizzes/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Quiz Created Successfully!");
        console.log("API Response:", data);
        navigate("/create_quiz2");
      } else {
        alert(`Failed to create quiz: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from storage
    setToken(""); // Clear token state
    navigate("/"); // Redirect to login
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h2 className="font-semibold text-lg">
          Hi, Admin |{" "}
          <span className="text-blue-500 cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        </h2>
        <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-lg font-bold">
          A
        </div>
      </div>

      {/* Navbar */}
      <div className="mt-4 bg-white w-full max-w-lg p-4 rounded-md shadow-md flex space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={()=> navigate("/admin_dashboard")}>Dashboard</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Quiz</button>
      </div>

      {/* Create Quiz Form */}
      <div className="mt-6 bg-white w-full max-w-lg p-6 rounded-md shadow-md">
        <h3 className="font-semibold text-lg mb-4">Create Quiz Step 1</h3>

        <input
          type="text"
          name="title"
          placeholder="Enter quiz title"
          value={quizData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />

        <input
          type="number"
          name="questions"
          placeholder="No. of questions"
          value={quizData.questions}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />

        <input
          type="number"
          name="score"
          placeholder="Enter Score"
          value={quizData.score}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />

        <input
          type="number"
          name="duration"
          placeholder="Enter Duration (in mins)"
          value={quizData.duration}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />

        {console.log("Token in storage =", token)}

        <button
          onClick={handleNext}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateQuiz;
