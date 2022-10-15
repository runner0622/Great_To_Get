import React from "react";

function CarasoleCard({ data }) {
  return (
    <div className="carasole-item">
      <div className="a-box">
        <div className="img-container">
          <div className="img-inner">
            <div className="inner-skew">
              <img src={data.img} alt="" />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h3>{data.header}</h3>
          <div>{data.info}</div>
        </div>
      </div>
    </div>
  );
}

export default CarasoleCard;
