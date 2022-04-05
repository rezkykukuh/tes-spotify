import { useState } from "react";
import { useSelector } from "react-redux";
import CardPlaylist from "../playlist/CardPlaylist";

const ModalSelect = ({ select, data }) => {
  const playlist = useSelector((state) => state.Playlist.playlist);
  const [choseplaylist, setPlaylist] = useState([]);
  const listplaylist = playlist.map((v) => (
    <div className="col-md-4 text-center p-3" key={v.id}>
      <CardPlaylist data={v} />
      <input
        onChange={() => setPlaylist([v])}
        className="form-check-input mt-3 bg-black"
        type="radio"
        name="flexRadioDefault"
        id={v.id + "id"}
      />
    </div>
  ));
  return (
    <div
      className="modal fade"
      id="modalselect"
      tabIndex="-1"
      aria-labelledby="modalselectLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add To Playlist
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-10">
                <h4>Pilih Playlist</h4>
                <div className="row">{listplaylist}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => {
                select(data, choseplaylist);
              }}
              type="button"
              className={`btn btn-primary ${
                choseplaylist.length > 0 ? "" : "disabled"
              }`}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelect;
