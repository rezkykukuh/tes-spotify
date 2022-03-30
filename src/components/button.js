import React from "react";

const Button = ({select, name , color = "primary"}) => {
    return  <button onClick={select} type='button' className={`btn btn-${color} mt-3`} >{name}</button>
}

export default Button;