import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Auth from "./components/login-signup";
import UserDashboard from "./components/user-dashboard";
import AdminDashboard from "./components/admin-dashboard";
import CreateQuiz from "./components/CreateQuiz"
import CreateQuizStep2 from "./components/CreateQuiz2"

const AppRoutes = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/user_dashboard" element={<UserDashboard />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/create_quiz" element={<CreateQuiz />} />
        <Route path="/create_quiz2" element={<CreateQuizStep2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
