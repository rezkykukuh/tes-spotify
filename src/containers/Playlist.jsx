import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPlaylist from "../components/molecule/playlist/CardPlaylist";
import ModalPlaylist from "../components/molecule/playlist/ModalPlaylist";
import Navbar from "../components/Navbar";
import { setPlaylist } from "../store/Playlist";
import { getPlaylistApi } from "../utils/api/playlistApi";

const Playlist = () => {
  const token = useSelector((state) => state.Auth.token);
  const data = useSelector((state) => state.Playlist.playlist);
  const dispatch = useDispatch();
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
    <Fragment>
      <Navbar />
      <div>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-md-10">
              <div className="row d-flex justify-content-center">
                {playlistCard}
              </div>
            </div>
          </div>
        </div>

        <ModalPlaylist playlist={modaldata} event={setModalData} />
      </div>
    </Fragment>
  );
};

export default Playlist;