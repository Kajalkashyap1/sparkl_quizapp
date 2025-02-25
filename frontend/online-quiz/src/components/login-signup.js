import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login-signup.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.user.role);

      console.log("Stored Token:", localStorage.getItem("token")); //debug
      console.log("Stored Role:", localStorage.getItem("role"));
      
      console.log(res.data);

      if( res.data.user.role === "admin" )
        navigate("/admin_dashboard");
      else
        navigate("/user_dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed!");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/signup/", { name, email, password, role });
      alert("Signup successful! Please log in.");
      setIsLogin(true); // Switch to login form after signup
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className=" card flex flex-col justify-center items-center m-auto mt-40 gap-5 bg-red">
      <h2 className="py-2 font-bold text-2xl px-2">{isLogin ? "Login" : "Signup"}</h2>
      {!isLogin && <input className="p-1 rounded-sm w-60" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />}
      <input className="p-1 rounded-sm w-60" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="p-1 rounded-sm w-60" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      {!isLogin && <select className="p-1 rounded-sm w-60" onChange={(e) => setRole(e.target.value)}>
        <option value="">-- Select Role --</option> {/* Default option */}
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>}

      {isLogin ? (
        <button className="bg-blue-500 font-medium m-5 p-3 rounded-md hover:bg-blue-600 w-28" onClick={handleLogin}>Login</button>
      ) : (
        <button className="bg-blue-500 font-medium m-5 p-3 rounded-md hover:bg-blue-600 w-28" onClick={handleSignup}>Signup</button>
      )}
      {/* <select name="role" required>
        <option value="" disabled hidden>
          Select Role
        </option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select> */}
      
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );

  
}

export default Auth;
