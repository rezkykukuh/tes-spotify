import React from "react";
import Img from "../../atoms/img";
import { Subtitle } from "../../atoms/text";
import { Title } from "../../atoms/text";
import ButtonSelect from "./ButtonSelect";
const CardSelect = ({ data, setmodal, isSelect, display = true, select }) => {
  const selectbutton = isSelect ? (
    <ButtonSelect
      isSelect={isSelect}
      name="Deselect"
      color="success"
      data={data}
      select={select}
    />
  ) : (
    <ButtonSelect setmodal={setmodal} name="Select" data={data} />
  );
  return (
    <div className="col-md-4 col-12">
      <div className="card">
        <Img
          data={
            data.album.images.length !== 0
              ? data.album.images[0].url
              : "http://placeimg.com/640/640/nature"
          }
        />
        <div className="card-body">
          <Title data={data.album.name} />
          <Subtitle data={data.artists[0].name} />
          {display ? selectbutton : ""}
        </div>
      </div>
    </div>
  );
};

export default CardSelect;