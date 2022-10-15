import React from "react";
import { useState, useEffect } from "react";
import { useEffectAsync } from "../../helper";

const SnackBar = (props) => {
	const [bar, setBar] = useState(true);
    const timeout = props.timeout === 'number' ? props.timeout : 3000;
    const closeHandler = props.CLOSE === 'function' ? props.CLOSE: ()=>{setBar(false)}


	useEffect(() => {
        
		if (bar) {
			setTimeout(() => {
				setBar(false);
			}, timeout);
		}else{
            closeHandler();
        }
	}, [bar]);

	return (
		<div>
			{bar ? (
				<>
					<div className="snackbar snackbar__show"> {props.MESSAGE} </div>
				</>
			) : null}

			
		</div>
	);
};

export default SnackBar;
