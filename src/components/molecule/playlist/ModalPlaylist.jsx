import CardSelect from "../track/CardSelect";

const ModalPlaylist = ({ playlist, event }) => {
  const listplaylist = playlist.map((v) => (
    <div className="col-md-4 text-center p-3" key={v.id}>
      <CardSelect data={v.track} display={false} />
    </div>
  ));
  return (
    <div
      className="modal fade"
      id="modalplaylist"
      tabIndex="-1"
      aria-labelledby="modalplaylistLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Playlist Items
            </h5>
            <button
              onClick={() => event([])}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-10">
                <div className="row">{listplaylist}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => event([])}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPlaylist;