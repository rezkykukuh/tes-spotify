import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import CreatePlaylist from "./containers/CreatePlaylist";
import SpotifyUseE from "./containers/SpotifyUseE";
import { useDispatch } from "react-redux";
import { setToken } from "./store/Auth";
import { setUser } from "./store/User";
import { isAuth } from "./utils/OAuth";
import { deleteStorage } from "./utils/storage";
import { getUserApi } from "./utils/api/userApi";

const App = () => {
  let token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(setToken(token));
      setMeProfile(token);
    }
  }, []);

  const setMeProfile = async (tokena) => {
    try {
      await getUserApi()
        .then((response) => {
          dispatch(setUser(response.data));
        })
        .catch(() => {
          deleteStorage();
          dispatch(setToken(""));
        });
    } catch (error) {
      console.log("error");
    }
  };

  const logout = () => {
    dispatch(setToken(""));
    deleteStorage();
    window.location.reload();
  };

  return (
    <div className="App">
      <Navbar logout={logout} />
      {token ? (
        <Routes>
          <Route path="/" element={<SpotifyUseE />} />
          <Route path="/playlist" element={<CreatePlaylist />} />
        </Routes>
      ) : (
        <div className="btn btn-danger">Anda Belum Login</div>
      )}
    </div>
  );
};

export default App;
