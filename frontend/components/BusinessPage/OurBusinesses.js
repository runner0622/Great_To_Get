import React from "react";

function OurBusinesses(props) {
  console.log(props);
  return (
    <div className="our_businesses-details">
      <h1>{props.header}</h1>
      <img src={props.img} alt="" />
      <p>{props.content}</p>
    </div>
  );
}

export default OurBusinesses;
