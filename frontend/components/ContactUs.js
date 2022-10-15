import React, { useRef } from "react";

import axios from "axios";
import { url } from "../helper";
import customToast from "./Block/swal/customToast";

function ContactUs() {
	const name = useRef(null);
	const email = useRef(null);
	const phone = useRef(null);
	const message = useRef(null);
	const submitContactUs = async (e) => {
		e.preventDefault();
		let phoneNo;
		if (phone.current.value.match(/^\d{10}$/)) {
			phoneNo = parseInt(phone.current.value);
		} else {
			customToast("warning", "enter a valid phone no");
		}

		const PAYLOAD = {
			contact_name: name.current.value,
			contact_phone: phoneNo,
			contact_message: message.current.value,
			contact_email: email.current.value,
		};

		console.log(PAYLOAD);

		try {
			const response = await axios.post(
				url("/api/contact/create"),
				PAYLOAD
			);

			if (response.status === 200) {
				name.current.value = "";
				phone.current.value = "";
				message.current.value = "";
				email.current.value = "";
				customToast("success", "your message has been sent");
			} else {
				customToast("warning", "please name, phone, message & email");
			}
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<div className="contactus_container">
			<div className="baseform">
				<div className="baseform__info">
					<div className="baseform__info__inner">
						<h1>how to find us</h1>
						<p>
							If you have any questions, just fill up the contact
							form,and we will answer you shortly. If you are
							living nearby,come vist us at our comfertable
							places.
						</p>
						<p>
							<div>
								Contact:
								<span className="inline">+91 9090909090</span>
							</div>
							<div>
								E-mail:
								<span className="inline">
									GreatToGet@gmail.com
								</span>
							</div>
						</p>
					</div>
				</div>
				<div className="baseform__form w500">
					<h3>get in touch</h3>
					<form
						action=""
						method="post"
						className="baseform__form__inner"
						onSubmit={submitContactUs}
					>
						<input
							type="text"
							className="input"
							placeholder="Name"
							ref={name}
						/>
						<input
							type="email"
							className="input"
							placeholder="E-mail"
							ref={email}
						/>
						<input
							type="text"
							className="input"
							placeholder="Phone No"
							ref={phone}
						/>
						<textarea
							type="text"
							placeholder="Message"
							ref={message}
						/>
						<input type="submit" value="SUBMIT" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
