import axios from "axios";
import { useState, useEffect } from "react";
import CardSelect from "../components/molecule/track/CardSelect";
import Input from "../components/atoms/input.jsx";
import ModalSelect from "../components/molecule/track/ModalSelect";

const SpotifyUseE = ({ token, auth, me }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [select, setSelect] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [modalData, setmodalData] = useState([]);
  useEffect(() => {
    getData();
    getPlaylist();
  }, [query, select, token]);

  const getData = async () => {
    if (auth && query !== "") {
      await axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: query,
            type: "track",
            limit: 10,
            market: "ID",
          },
        })
        .then((response) => {console.log(response)
          combineData(response.data.tracks.items);
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

  const getPlaylist = async () => {
    if (auth) {
      await axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPlaylist(response.data.items);
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

  const combineData = (data) => {
    const combine = data.map((track) => ({
      ...track,
      isSelected: select.find((sele) => sele.uri === track.uri),
    }));
    setData(combine);
  };

  const handleSelect = async (track, playlist) => {
    const selected = select.find((sele) => sele.uri === track.uri);
    if (selected) {
      setSelect(select.filter((sele) => sele.uri !== track.uri));
    } else {
      setSelect([...select, track]);
      await axios
        .post(
          `	https://api.spotify.com/v1/playlists/${playlist[0].id}/tracks`,
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              position: 0,
              uris: track.uri,
            },
          }
        )
        .then((response) => {
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.classList.remove("modal-backdrop"));
          alert(`Berhasil insert Ke Playlist ${playlist[0].name}`);
        })
        .catch((error) => {
          if (error.response.status === 401 && error.response) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("auth");
            window.location.replace("/");
          }
        });
    }
  };

  const searchData = auth ? (
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
              setmodal={setmodalData}
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
              setmodal={setmodalData}
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

      <ModalSelect select={handleSelect} data={modalData} playlist={playlist} />
    </div>
  );
};

export default SpotifyUseE;
