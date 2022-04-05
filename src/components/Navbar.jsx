import { urlGet } from "../data/spotifyconf";
import { Link } from "react-router-dom";
const Navbar = ({ auth, logout, me }) => {
  const getApiToken = auth ? (
    <button onClick={() => logout()} type="button" className="btn btn-danger">
      Halo {me}, Logout
    </button>
  ) : (
    <a href={urlGet} className="btn btn-primary">
      login
    </a>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid d-flex align-content-center">
        {/* <a className="navbar-brand" href="#">
          Navbar
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Track
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/playlist">
                Playlist
              </Link>
            </li>
          </ul>
        </div>
        <div className="float-right">{getApiToken}</div>
      </div>
    </nav>
  );
};

export default Navbar;
