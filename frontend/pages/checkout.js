import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { url, sha256, isNetworkError } from "../helper";
import customToast from "../components/Block/swal/customToast";
import yesNO from "../components/Block/swal/yesNo";
import Swal from "sweetalert2";

import {
	clearItemFromCart,
	decrementItemToCart,
	incrementItemToCart,
	pushRecentOrder,
} from "../redux/actions/CartCreator";
import { useRouter } from "next/router";

function CheckOut() {
	const shopState = useSelector((state) => state.shop);
	const {
		cart: { ...cartItems },
		total,
		quantity,
		discount,
		subtotal,
	} = shopState;

	const router = useRouter();
	const dispatch = useDispatch();

	const name = useRef(null);
	const email = useRef(null);
	const phoneNo = useRef(null);
	const emailOTP = useRef(null);
	const address = useRef(null);

	const [payData, setPayData] = useState({});
	const [paymentDone, setPaymentDone] = useState(false);

	const [verified, setVerified] = useState(false);
	const [sentOTP, setSentOTP] = useState(false);
	const [otpHEX, setOtpHEX] = useState(0);

	const paymentOptions = (amount, order_id) => {
		return {
			key: "rzp_test_11XaW3qVDXTYZC", // Enter the Key ID generated from the Dashboard
			amount: (total * 100)?.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "Anand Pallavi",
			description: "payment for your order",
			image: "https://cdn.logo.com/hotlink-ok/logo-social.png",

			readonly: {
				email: true,
				contact: true,
			},
			order_id: payData.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};
				try {
					const paymentResponse = await axios.post(
						url("/api/order/success"),
						{
							order_id: order_id,
						}
					);

					if (paymentResponse.data.success) {
						setPaymentDone(true);
						customToast("success", "payment successfull");
						Swal.fire(
							"Please Save your order id",
							paymentResponse.data.order_id
						);
						dispatch(
							pushRecentOrder({
								order_id: paymentResponse.data.order_id,
								amount: total,
								timestamp: Date.now(),
								quantity: quantity,
								track: "order created",
							})
						);
						setTimeout(() => {
							dispatch(clearItemFromCart());
						}, 1000);
					} else {
						customToast("error", paymentResponse.data.msg);
					}
				} catch (error) {
					console.log("catch block error", error);
				}
			},

			prefill: {
				name: "Gaurav Kumar",
				email: "gaurav.kumar@example.com",
				contact: "9999999999",
			},
			theme: {
				color: "#42b1e0",
			},
		};
	};

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	// razor pay
	const razorpayHandler = async (e) => {
		e.preventDefault();

		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?");
			return;
		}

		const razorpay = new window.Razorpay(
			paymentOptions(total, payData.order_id)
		);
		razorpay.on("payment.failed", function (response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});
		razorpay.open();
	};

	const otpSendHandler = async ({ target: { name, email, phoneNo } }) => {
		if ((name.value, email.value, phoneNo.value)) {
			setSentOTP(true);

			// try {
			// 	const reply = await axios.post(url("/api/sendmail"), {
			// 		fullname: name.value,
			// 		email: email.value,
			// 		phone: phoneNo.value,
			// 	});

			// 	if (reply.data?.success === "sent") {
			// 		setSentOTP(true);
			// 	}

			// 	// // 5555 -> dummy otp
			// 	// setOTP(
			// 	// 	"c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525"
			// 	// );
			// } catch (error) {
			// 	console.log(error.response?.data.success);
			// }
		}
	};

	const verifyOtpHandler = async () => {
		if (
			(await sha256(emailOTP.current.value)) ===
			"c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525"
		) {
			try {
				const apiResult = await axios.post(url("/api/order"), {
					amount_paid: total * 100,
					order_name: name.current.value,
					order_email: email.current.value,
					paid_status: false,
					address: address.current.value,
					phone_number: phoneNo.current.value,
					items_ordered: Object.keys(cartItems),
				});

				if (apiResult.data?.success === "order created") {
					Swal.fire({
						title: "Order Created",
						text: `Save your order ID for tracking | ${apiResult.data.order_id}`,
						icon: "success",
						confirmButtonText: "OK",
					});
				}
				setVerified(true);
				customToast("success", "OTP verified successfully");
				setPayData(apiResult.data);
			} catch (error) {
				if (isNetworkError(error)) {
					return router.push("/error/500");
				}
				console.log(error);
			}
		} else {
			customToast("warning", "Incorrect OTP");
		}
	};

	const clearCart = () => {
		const clearFunction = () => {
			dispatch(clearItemFromCart());
		};
		yesNO("Sure Want to clear Cart ?", clearFunction);
	};


	// bye! ek last baata
	const trackOrderHandler = () => {
		Swal.fire({
			title: "Enter Tracking ID",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "Look up",
			showLoaderOnConfirm: true,
			preConfirm: async (data) => {
				try {
					const apiResult = await axios.post(
						url("/api/order/track"),
						{
							order_id: data,
						}
					);
					if (apiResult.data.success === "success") {
						Swal.fire({
							title: apiResult.data?.tracking_status,
						});
					}
				} catch (error) {
					Swal.fire({
						title: "Enter Correct Tracking ID",
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};

	const CartItem = ({
		item,
		key,
		initalvalue,
		maxvalue,
		incrementvalue,
		decrementvalue,
		minvalue,
	}) => {
		const [valueInstance, setValueInstance] = useState(initalvalue);

		const incrementHandler = () => {
			const maxCheck = valueInstance >= maxvalue;

			if (maxCheck) {
				customToast(
					"warning",
					`item cannot be greater than ${maxvalue}`
				);
			} else {
				setValueInstance((x) => x + incrementvalue);
				dispatch(
					incrementItemToCart({
						id: item._id,
					})
				);
			}
		};

		const decrementHandler = () => {
			const minCheck = minvalue >= valueInstance;
			if (minCheck) {
				customToast("warning", `item cannot be less than ${minvalue}`);
			} else {
				setValueInstance((x) => x - decrementvalue);
				dispatch(
					decrementItemToCart({
						id: item._id,
					})
				);
			}
		};

		return (
			<>
				<div className="shopcard" key={key}>
					<div className="shopcard__title">{item.title}</div>
					<div className="divider"></div>
					<div className="shopcard__main">
						<div className="shopcard__image">
							<img src={item.images[0]} className="" />
						</div>
						<div className="shopcard__info">
							<div className="shopcard__info__price">
								<div className="shopcard__info__price__base">
									{item.price}
								</div>
								<div className="shopcard__info__price__discount">
									{item.discount_price}
								</div>
							</div>
							{/* INCREMENT DECREMENT */}
							<div className="indec">
								<button
									className="indec__dec"
									onClick={decrementHandler}
								>
									-
								</button>
								<div>{valueInstance}</div>

								<button
									className="indec__inc"
									onClick={incrementHandler}
								>
									+
								</button>
							</div>
							<div className="shopcard__total">
								{item.itemTotal}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div className="title__lander title__lander-checkout">checkout</div>
			<div className="block">
				<div className="checkout__header">
					<div className="checkout__action">
						{quantity > 0 && (
							<div
								className="checkout__button checkout__button-clear"
								onClick={clearCart}
							>
								clear cart
							</div>
						)}
						<div
							className="checkout__button checkout__button-track"
							onClick={trackOrderHandler}
						>
							track order
						</div>

						<div
							className="checkout__button checkout__button-recent"
							onClick={() => router.push("/recent")}
						>
							recent order
						</div>
					</div>
				</div>
				<div className="checkout">
					<div className="shopcard__group">
						{Object.keys(cartItems).map((item, index) => {
							return (
								<CartItem
									key={item}
									item={cartItems[item]}
									incrementvalue={1}
									decrementvalue={1}
									minvalue={0}
									initalvalue={cartItems[item].itemQuantity}
									maxvalue={
										cartItems[item].available_quantity
									}
								/>
							);
						})}
					</div>
					{quantity > 0 && !paymentDone ? (
						<div className="baseform__form checkout__form w500">
							<div className="baseform__title">Order Summary</div>
							<div className="divider" />
							<div className="cart__summary">
								<div className="cart__summary__quantity">
									<label> Quantity</label>
									<div className="value">{quantity}</div>
								</div>

								<div className="cart__summary__subtotal">
									<label>Sub total</label>
									<div className="value">{subtotal}</div>
								</div>

								<div className="cart__summary__discount">
									<label> Discount</label>
									<div className="value">{discount}</div>
								</div>
								<div className="cart__summary__total">
									<label>Payable Total</label>
									<div className="value">{total}</div>
								</div>
							</div>
							<div className="divider" />
							{!otpHEX && (
								<form
									className="baseform__form__inner"
									action="javascript:void(0);"
									// method="post"
									onSubmit={otpSendHandler}
								>
									<input
										type="text"
										name="name"
										id=""
										placeholder="Name"
										ref={name}
										disabled={sentOTP}
										required={true}
										className="input"
									/>
									<input
										type="text"
										name="phoneNo"
										id=""
										placeholder="Phone Number"
										ref={phoneNo}
										disabled={sentOTP}
										required={true}
										className="input"
									/>
									<input
										type="text"
										name="email"
										id=""
										placeholder="E-Mail"
										ref={email}
										disabled={sentOTP}
										className="input"
										required={true}
									/>
									<textarea
										type="text"
										name="address"
										id=""
										placeholder="Address"
										ref={address}
										disabled={sentOTP}
										className="input"
										required={true}
									/>

									{!verified && (
										<input
											type="submit"
											id="send_otp_button"
											className="input"
											value={`${"Send Otp & Place order | OTP is 5555"}`}
										/>
									)}
								</form>
							)}

							{!verified && sentOTP && (
								<form
									className="baseform__form__inner"
									action="javascript:void(0);"
									// method="post"
									onSubmit={verifyOtpHandler}
								>
									<p>A OTP has been sent to your E-mail.</p>
									<input
										type="text"
										name="otp"
										className="input"
										placeholder="Enter E-mail OTP"
										id=""
										ref={emailOTP}
										required
									/>
									<input
										type="submit"
										id="verify_button"
										value="submit"
									/>
								</form>
							)}

							{/* <p>
                                        The contact number and the email address will be the
                                        same while paying.
                                    </p> */}
							{verified && !paymentDone && (
								<button
									id="checkout_button"
									className="checkout__pay"
									onClick={(e) => razorpayHandler(e)}
								>
									<FontAwesomeIcon
										icon={faShoppingBag}
										style={{
											margin: "0 5px",
											fontSize: "15px",
										}}
									/>
									Pay &#8377;{total}
								</button>
							)}
						</div>
					) : (
						<div
							style={{
								width: "100%",
								height: "100%",
							}}
						>
							Nothing in cart
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default CheckOut;
