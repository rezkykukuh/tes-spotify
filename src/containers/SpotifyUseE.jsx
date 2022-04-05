import { useState, useEffect } from "react";
import CardSelect from "../components/molecule/track/CardSelect";
import Input from "../components/atoms/input.jsx";
import ModalSelect from "../components/molecule/track/ModalSelect";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylist } from "../store/Playlist";
import { setSelectTrack, setTrack } from "../store/Tracks";
import { getPlaylistApi, postItemPlaylistApi } from "../utils/api/playlistApi";
import { searchTrackApi } from "../utils/api/searchTrackApi";
const SpotifyUseE = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  const data = useSelector((state) => state.Track.tracks);
  const modalData = useSelector((state) => state.Track.modalTrack);
  const select = useSelector((state) => state.Track.selectTrack);
  const [query, setQuery] = useState("");
  useEffect(() => {
    getData();
    getPlaylist();
  }, [query, select, token]);

  const getData = async () => {
    if (query !== "") {
      const params = {
        q: query,
        type: "track",
        limit: 10,
        market: "ID",
      };
      searchTrackApi(params).then((response) => {
        combineData(response.data.tracks.items);
      });
    }
  };

  const getPlaylist = async () => {
    try {
      const { data } = await getPlaylistApi();
      dispatch(setPlaylist(data.items));
    } catch (error) {
      console.log(error);
    }
  };

  const combineData = (data) => {
    const combine = data.map((track) => ({
      ...track,
      isSelected: select.find((sele) => sele.uri === track.uri),
    }));
    dispatch(setTrack(combine));
  };

  const handleSelect = async (track, playlist) => {
    const selected = select.find((sele) => sele.uri === track.uri);
    if (selected) {
      dispatch(setSelectTrack(select.filter((sele) => sele.uri !== track.uri)));
    } else {
      try {
        postItemPlaylistApi(playlist[0].id, track.uri).then(() => {
          alert(`Berhasil insert Ke Playlist ${playlist[0].name}`);
          dispatch(setSelectTrack([...select, track]));
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const searchData = token ? (
    <div className="">
      <Input get={setQuery} />
    </div>
  ) : (
    <div className="btn btn-danger ma-5">Anda Belum Login</div>
  );

  const getTrack =
    data.length > 0 ? (
      data.map((track) => {
        if (select.length > 0) {
          return (
            <CardSelect
              key={track.id}
              data={track}
              isSelect={track.isSelected}
              display={true}
              select={handleSelect}
            />
          );
        } else {
          return (
            <CardSelect
              key={track.id}
              data={track}
              display={true}
              select={handleSelect}
            />
          );
        }
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
          <div className="col-md-3">
            <div className="d-grid gap-2">{searchData}</div>
          </div>
          <div className="col-md-9">
            <div className="row">{getTrack}</div>
          </div>
        </div>
      </div>

      <ModalSelect select={handleSelect} data={modalData} />
    </div>
  );
};

export default SpotifyUseE;
