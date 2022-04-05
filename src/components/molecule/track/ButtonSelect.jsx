import React from "react";
import { useDispatch } from "react-redux";
import { setModalTrack } from "../../../store/Tracks";

const ButtonSelect = ({ isSelect, name, color = "primary", data, select }) => {
  const dispatch = useDispatch();
  return isSelect ? (
    <button
      onClick={() => {
        select(data, []);
      }}
      type="button"
      className={`btn btn-${color} mt-3 `}
    >
      {name}
    </button>
  ) : (
    <button
    onClick={() => {
      dispatch(setModalTrack(data));
    }}
    type="button"
    className={`btn btn-${color} mt-3 `}
    data-bs-toggle="modal"
    data-bs-target="#modalselect"
  >
    {name}
  </button>
  );
};

export default ButtonSelect;
