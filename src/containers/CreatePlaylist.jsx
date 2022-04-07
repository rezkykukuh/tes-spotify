import { Fragment } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { postNewPlaylistApi } from "../utils/api/playlistApi";
import { urlGet } from "../utils/spotifyconf";
const CreatePlaylist = () => {
  const token = useSelector((state) => state.Auth.token);
  const me = useSelector((state) => state.User.user);
  const [playlist, setFromPlayList] = useState({
    title: "",
    describe: "",
  });
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFromPlayList({ ...playlist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const data = {
        name: playlist.title,
        description: playlist.describe,
        public: true,
      };
      try {
        postNewPlaylistApi(me.id, data).then(() => {
          setFromPlayList({ title: "", describe: "" });
          alert("Berhasil membuat palylist");
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const inputPlaylist = token ? (
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
      <a href={urlGet} className="btn btn-danger">
        Anda Belum Login
      </a>
    </div>
  );

  return (
    <Fragment>
      <Navbar />
      <div>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-md-3">{inputPlaylist}</div>
            <div className="col-md-9"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePlaylist;