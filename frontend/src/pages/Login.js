import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";



function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const response = await loginUser({
    email,
    password,
  });

  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(response.data));
    navigate("/");
  } else {
    alert(response.data.message);
  }

}
  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );

}

export default Login;