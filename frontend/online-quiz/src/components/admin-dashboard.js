import { useState } from "react";
import {useNavigate} from "react-router-dom";


const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between Admin and Participant
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("isAdmin");
    navigate("/api/users/login") // Redirect to login page
  };

  const quizzes = [
    { id: 1, name: "Quiz 1", score: 20, duration: 20 },
    { id: 2, name: "Quiz 2", score: 10, duration: 10 },
    { id: 3, name: "Quiz 3", score: 10, duration: 10 },
    { id: 4, name: "Quiz 4", score: 20, duration: 20 },
  ];

  const quizDetails = [
    { user: "User 1", score: 16, status: "Complete" },
    { user: "User 2", score: 10, status: "Complete" },
    { user: "User 3", score: "NA", status: "In-progress" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h2 className="font-semibold text-lg">Hi, Admin | <button className="text-blue-500 cursor-pointer" onClick={handleLogout}>Logout</button></h2>
        <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center text-lg font-bold">A</div>
      </div>

      {/* Navbar */}
      <div className="mt-4 bg-white w-full max-w-2xl p-4 rounded-md shadow-md flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Dashboard</button>
        <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => navigate("/create_quiz")}>Create Quiz</button>
        <button onClick={() => setIsAdmin(!isAdmin)} className="px-4 py-2 bg-green-500 text-white rounded-md">
          Switch to {isAdmin ? "Participant" : "Admin"}
        </button>
      </div>

      {/* Content */}
      <div className="mt-6 bg-white w-full max-w-2xl p-4 rounded-md shadow-md">
        {isAdmin ? (
          // Admin View
          <div>
            <h3 className="font-semibold text-lg mb-2">Quiz</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Quiz</th>
                  <th className="border p-2">Score</th>
                  <th className="border p-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="text-center">
                    <td className="border p-2 text-blue-500 cursor-pointer">{quiz.name}</td>
                    <td className="border p-2">{quiz.score}</td>
                    <td className="border p-2">{quiz.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Participant View
          <div>
            <h3 className="font-semibold text-lg mb-2">Quiz 4</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">User</th>
                  <th className="border p-2">Score</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {quizDetails.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{user.user}</td>
                    <td className="border p-2">{user.score}</td>
                    <td className="border p-2">
                      <span className={user.status === "Complete" ? "text-blue-600 font-semibold" : "text-red-600"}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
