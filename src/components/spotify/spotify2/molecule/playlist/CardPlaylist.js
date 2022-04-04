import React from "react";
import Img from "../../atoms/img";
import { Subtitle } from "../../atoms/text";
import { Title } from "../../atoms/text";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const CardPlaylist = ({ data, event, token }) => {
  const requestItem = async () => {
    const request = await axios
      .get(`${data.tracks.href}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        event(response.data.items);
      })
      .catch((error) => {
        alert("Request Gagal");
        if (error.response.status === 401 && error.response) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("auth");
          window.location.replace("/");
        }
      });
  };
  return (
    <div className="col-md-4 col-12 ">
      <div
        className="card cardlist"
        data-bs-toggle="modal"
        data-bs-target="#modalplaylist"
        onClick={() => requestItem()}
      >
        <Img
          data={
            data.images.length !== 0
              ? data.images[0].url
              : "http://placeimg.com/640/640/tech"
          }
        />
        <div className="card-body">
          <Title data={data.name} />
          <Subtitle data={data.description} />
          <Subtitle data={data.id} />
        </div>
      </div>
    </div>
  );
};

export default CardPlaylist;