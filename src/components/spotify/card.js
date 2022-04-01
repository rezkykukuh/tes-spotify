import React from "react";
import Img from "./img";
import Button from "./button";
import { Title, Subtitle, Link } from "./text";
const Card = ({ data, select, isSelect }) => {
  const selectbutton = isSelect ? (
    <Button select={select} name="Deselect" color="success" data={data} />
  ) : (
    <Button select={select} name="Select" data={data} />
  );
  return (
    <div className="container">
      <div className="card">
        <Img data={data} />
        <div className="card-body">
          <Title data={data} />
          <Subtitle data={data} />
          <Link data={data}/>
          {/* <Button select={select}/> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
