import React from "react";

const Input = ({ get }) => {
  return (
    <input
      onChange={get}
      type="text"
      className="form-control"
      placeholder="type yaour name track"
      aria-label="type yaour name track"
      aria-describedby="basic-addon2"
    />
  );
};

export default Input;
