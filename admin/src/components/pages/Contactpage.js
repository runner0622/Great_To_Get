import React, { useEffect, useState } from "react";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync } from "../../helper";
import yesNO from "../blocks/swal/yesNo";

const ContactPage = () => {
	const [notifications, setNotifications] = useState([]);
	const [forceRenderCount, setForceRenderCount] = useState(0);

	const HEADER_PAYLOAD = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
	};

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/generic/contact/read"), {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			setNotifications(result.data.msg);
		} catch (error) {
			console.log(error);
		}
	}, [forceRenderCount]);

	const notificationDeleteHandler = async (id, name) => {
		const yesCallback = async () => {
			try {
				await axios.delete(url("/generic/contact/delete"), {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
					data: {
						notificationID: id,
					},
				});
				setForceRenderCount((x) => x + 1);
			} catch (error) {
				console.log(error);
			}
		};

		yesNO(`${name} details`, await yesCallback);
	};

	const renderNotifications = () => {
		if (notifications.length > 0) {
			return notifications.map((notification, index) => {
				return (
					<div
						className="notification__item notification"
						key={index}
					>
						<div className="notification__item__id">
							{String(notification._id).slice(17)}
						</div>
						<div className="notification__item__name">
							{notification.contact_name}
						</div>
						<div className="notification__item__contact">
							{notification.contact_phone}
						</div>

						<div className="notification__item__message">
							{notification.contact_message}
						</div>
						<div className="notification__item__delete">
							<button
								className="button button-delete"
								onClick={() => {
									notificationDeleteHandler(
										notification._id,
										notification.contact_name
									);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div className="view">
			<Navbar />
			<div className="wrapper_notification">
				<div className="notification">
					<div className="notification__item notification__header">
						<div className="notification__item__id">ID</div>
						<div className="notification__item__name">Name</div>
						<div className="notification__item__contact">
							Contact
						</div>
						<div className="notification__item__message">
							Message
						</div>
						<div className="notification__item__delete">Action</div>
					</div>

					{renderNotifications()}
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
