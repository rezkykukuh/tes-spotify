import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import CreatePlaylist from "./containers/CreatePlaylist";
import SpotifyUseE from "./containers/SpotifyUseE";

const App = () => {
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let auth = window.localStorage.getItem("auth");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("auth", true);
      setToken(token);
      setAuth(true);
    } else {
      setToken(token);
      setAuth(auth);
    }
    if (token) {
      setMeProfile(token);
      window.localStorage.setItem("profileId", user.id);
      window.localStorage.setItem("profileName", user.display_name);
    }
  }, []);

  const setMeProfile = async (tokena) => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${tokena}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert("Request Gagal");
        if (error.response.status === 401 && error.response) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("auth");
          window.localStorage.removeItem("profileId");
          window.localStorage.removeItem("profileName");
          window.location.replace("/");
        }
      });
  };
  const logout = () => {
    setToken("");
    setAuth(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("profileId");
    window.localStorage.removeItem("profileName");
    window.location.reload();
  };
  return (
    <div className="App">
      <Navbar auth={auth} logout={logout} me={user.display_name} />
      {token ? (
        <Routes>
          <Route
            path="/"
            element={<SpotifyUseE token={token} auth={auth} me={user} />}
          />
          <Route
            path="/playlist"
            element={<CreatePlaylist token={token} auth={auth} me={user} />}
          />
        </Routes>
      ) : (
        <div className="btn btn-danger">Anda Belum Login</div>
      )}
    </div>
  );
};

export default App;
