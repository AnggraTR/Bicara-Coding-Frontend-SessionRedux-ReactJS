import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";
import axios from "axios";

axios.defaults.withCredentials = true; // penting untuk session cookie

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password
      });
      dispatch(setUser(res.data.user));
    } catch (err) {
      alert("Login gagal");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/check-session")
      .then(res => {
        if (res.data.loggedIn) {
          dispatch(setUser(res.data.user));
        }
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Aplikasi Login</h1>
      {!user.loggedIn ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Selamat datang, {user.name}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
