import { Fragment } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <h1>Home</h1>
      </div>
    </Fragment>
  );
};

export default Home;