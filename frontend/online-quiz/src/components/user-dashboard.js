import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/quizzes/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setQuizzes(res.data))
      .catch((err) => alert("Error fetching quizzes"));
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <h3>{quiz.title}</h3>
          <p>Score: {quiz.total_score}</p>
          <p>Duration: {quiz.duration} mins</p>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
