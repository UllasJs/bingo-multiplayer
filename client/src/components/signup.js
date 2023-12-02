import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
// import "./style/signup.css";
// import { Link } from "react-router-dom";

export function SignUp({ setIsAuth }) {
  const cookies = new Cookies();

  const [user, setUser] = useState({});

  function onchangehandle(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    console.log(user);
  }

  const Adduser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/signup", user)
      .then((res) => {
        const { token, userId, username, hashedPassword } = res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="SignUp-main">
      <h1>Sign Up</h1>
      <form>
        <div className="text-fields">
          <label htmlFor="username">Player Name : </label>
          <input
            type="text"
            onChange={onchangehandle}
            name="username"
            placeholder="Enter Player Name"
          />
        </div>
        <div className="text-fields">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            onChange={onchangehandle}
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <button onClick={Adduser}>Add Player</button>
      </form>
    </div>
  );
}
