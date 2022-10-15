import React from "react";
import sadIcon from "../../assets/sadIcon.svg";

const x404 = () => {
	return (
		<div className="x404">
			<div className="sadface">
                <img src={sadIcon} alt="sadicon" ></img>
            </div>
			<div className="text404">404 not found</div>
		</div>
	);
};

export default x404;
