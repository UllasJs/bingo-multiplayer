import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./style/signup.css";
import axios from "axios";
import Cookies from "universal-cookie";

export function Login({ setIsAuth }) {
  const cookies = new Cookies();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const LogUser = (e) => {
    e.preventDefault();
    // console.log(username, password);

    axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        const { token, userId, username } = res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);

        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-main">
      <h1>Login</h1>
      <form>
        <div className="text-fields">
          <label htmlFor="username">Player Name : </label>
          <input
            type="text"
            onChange={(event) => {
              setusername(event.target.value);
            }}
            name="username"
            placeholder="Enter Player Name"
          />
        </div>
        <div className="text-fields">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button onClick={LogUser} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
