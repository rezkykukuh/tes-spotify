import React from "react";
import Img from "./img";
import Button from "./button";
import { Title, Subtitle } from "./text";
const Card = ({ data, select }) => {
  return (
    <div className="col-md-4 col-12">
      <div className="card">
        <Img data={data} />
        <div className="card-body">
          <Title data={data} />
          <Subtitle data={data} />
          {/* <Button select={select}/> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
