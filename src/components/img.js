import React from "react";

const Img = ({data}) => {
    return  <img src={data.album.images[1].url} className="card-img-top" alt="imagealbum"/>
}

export default Img;