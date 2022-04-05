import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardPlaylist from "../components/molecule/playlist/CardPlaylist";
import ModalPlaylist from "../components/molecule/playlist/ModalPlaylist";
import { setPlaylist } from "../store/Playlist";
import { getPlaylistApi, postNewPlaylistApi } from "../utils/api/playlistApi";
const CreatePlaylist = () => {
  const token = useSelector((state) => state.Auth.token);
  const data = useSelector((state) => state.Playlist.playlist);
  const me = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const [playlist, setFromPlayList] = useState({
    title: "",
    describe: "",
  });
  const [modaldata, setModalData] = useState([]);
  useEffect(() => {
    getPlaylist();
  }, [token]);

  const getPlaylist = async () => {
    try {
      const { data } = await getPlaylistApi();
      dispatch(setPlaylist(data.items));
    } catch (error) {
      console.log(error);
    }
  };

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
          getPlaylist();
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
