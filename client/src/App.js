import "./App.css";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import JoinGame from "./page/joingame";

function App() {
  const api_key = "882nhfx46cuu";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance(api_key);

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  if (isAuth) {
  }

  function logOut() {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {isAuth ? (
            <Route
              path="/"
              element={
                <Chat client={client}>
                  <JoinGame />
                  <button className="logOutBtn" onClick={logOut}>
                    Log Out
                  </button>
                </Chat>
              }
            ></Route>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <div style={{ display: "flex", alignItems: "center",justifyContent: 'space-around', gap: "50px" }}>
                    <SignUp setIsAuth={setIsAuth} />
                    <Login setIsAuth={setIsAuth} />{" "}
                  </div>
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
