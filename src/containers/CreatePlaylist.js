import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { USERID } from "../components/data/spotifyconf";
import CardPlaylist from "../components/spotify/spotify2/molecule/playlist/CardPlaylist";
import ModalPlaylist from "../components/spotify/spotify2/molecule/playlist/ModalPlaylist";
const CreatePlaylist = ({ token, auth, me }) => {
  const [playlist, setFromPlayList] = useState({
    title: "",
    describe: "",
  });
  const [data, setData] = useState([]);
  const [modaldata, setModalData] = useState([]);
  // https://api.spotify.com/v1/playlists/55w1jHg37wjz4ZTA0uQqXE/tracks
  useEffect(() => {
    getPlaylist();
  }, [token]);

  const getPlaylist = async () => {
    if (auth) {
      await axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.items);
        })
        .catch((error) => {
          alert("Request Gagal");
          if (error.response.status === 401 && error.response) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("auth");
            window.location.replace("/");
          }
        });
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFromPlayList({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth) {
      const data = {
        name: playlist.title,
        description: playlist.describe,
        public: true,
      };
      await axios
        .post(`https://api.spotify.com/v1/users/${me.id}/playlists`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFromPlayList({ title: "", describe: "" });
          getPlaylist();
          alert("Berhasil mempuat palylist");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401 && error.response) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("auth");
            window.location.replace("/");
          }
        });
    }
  };

  const inputPlaylist = auth ? (
    <div className="mt-3">
      <h3>Input Playlist Form</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="titleplaylist" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={playlist.title}
            onChange={handleForm}
            className={`form-control ${
              playlist.title.length >= 10
                ? "is-valid"
                : playlist.title !== ""
                ? "is-invalid"
                : ""
            }`}
            id="titleplaylist"
            aria-describedby="titleplauhelp"
            required
          />
          <div id="titleplauhelp" className="form-text" minLength="10">
            Minimum 10 Character
          </div>
          <div className="valid-feedback">Looks good!</div>
          <div
            id="validationServerUsernameFeedback"
            className="invalid-feedback"
          >
            Character kurang dari 10
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="descplaylist" className="form-label">
            Description
          </label>
          <textarea
            value={playlist.describe}
            rows="6"
            name="describe"
            onChange={handleForm}
            type="text"
            className="form-control"
            id="descplaylist"
            required
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${
            playlist.title.length >= 10 && playlist.describe !== ""
              ? ""
              : "disabled"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className="d-grid gap-2 mt-2">
      <div className="btn btn-danger">Anda Belum Login</div>
    </div>
  );

  const playlistCard =
    data.length > 0 ? (
      data.map((playlist) => {
        return (
          <CardPlaylist
            key={playlist.id}
            data={playlist}
            event={setModalData}
            token={token}
          />
        );
      })
    ) : (
      <div className="container d-flex justify-content-center align-content-center">
        <h1>Empty</h1>
      </div>
    );

  return (
    <div>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">{inputPlaylist}</div>
          <div className="col-md-9">
            <h2 className="bg-success text-white p-2 text-center">
              Your Playlist
            </h2>
            <div className="row">{playlistCard}</div>
          </div>
        </div>
      </div>

      <ModalPlaylist playlist={modaldata} />
    </div>
  );
};

export default CreatePlaylist;