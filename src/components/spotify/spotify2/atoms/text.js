import React from "react";

const Title = ({ data }) => {
  return <h5 className="card-title">{data}</h5>;
};

const Subtitle = ({ data }) => {
  return <h6 className="card-subtitle mb-2 text-muted">{data.name}</h6>;
};

export { Title, Subtitle };