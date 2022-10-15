import React, { useState, useRef, useEffect, useReducer } from "react";
import Navbar from "./../blocks/Navbar";
import { isEmpty, url, HEADER_PAYLOAD, useEffectAsync } from "../../helper";
import axios from "axios";
import Upload from "rc-upload";
// import SnackBar from './../blocks/SnackBar';
import productReducer from "./../reducers/productReducer";
import ACTIONS from "../reducers/actions";
import yesNO from "../blocks/swal/yesNo";
import customToast from "../blocks/swal/customToast";
import uploadWait from "../blocks/swal/uploadWait";
import { useLocation, useHistory } from "react-router-dom";
import useIncDec from "../../hooks/useIncDec";
import SimpleImageSlider from "react-simple-image-slider";

const NewProduct = (props) => {
	const location = useLocation();
	const currentID = useRef(location.pathname.split("/").pop());
	const history = useHistory();

	const [price, setPrice, PriceBlock] = useIncDec({
		initalvalue: 50,
		minvalue: 0,
		maxvalue: 1000000,
	});

	const [discount_price, setDiscountPrice, DiscountPriceBlock] = useIncDec({
		initalvalue: 40,
		minvalue: 0,
		maxvalue: 1000000,
	});

	const [available_quantity, setAvailableQuantity, AvailableQuantityBlock] =
		useIncDec({
			initalvalue: 2,
			minvalue: 0,
			maxvalue: 1000000,
		});

	const productInitialState = {
		id: currentID.current,
		title: "",
		info: "",
		images: ["", "", "", "", "", ""],
	};

	const [state, dispatch] = useReducer(productReducer, productInitialState);
	const [currentImage, setCurrentImage] = useState(0);

	useEffectAsync(async () => {
		try {
			if (location.search !== "?newproduct") {
				const checkExists = await axios.get(
					url(`/api/product/read/${currentID.current}`)
				);

				if (!isEmpty(checkExists.data.msg)) {
					dispatch({
						type: ACTIONS.PRODUCT_STATE,
						payload: {
							id: checkExists.data.msg.id,
							info: checkExists.data.msg.info,
							title: checkExists.data.msg.title,
							images: checkExists.data.msg.images,
							price: checkExists.data.msg.price,
							discount_price: checkExists.data.msg.discount_price,
						},
					});

					setPrice(checkExists.data.msg.price);
					setAvailableQuantity(
						checkExists.data.msg.available_quantity
					);
					setDiscountPrice(checkExists.data.msg.discount_price);
				}
			}
		} catch (error) {
			console.log("error new product --> ", error.response);
		}
	}, []);

	const productSaveHandler = async () => {
		const productData = {
			id: state.id,
			info: state.info,
			discount_price: discount_price,
			title: state.title,
			images: state.images,
			price: price,
			available_quantity: available_quantity,
		};
		try {
			await axios.post(url("/product/create"), productData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});

			if (location.search === "?newproduct") {
				history.push(`/products/${state.id}`);
			}

			customToast("success", "Data Saved");
		} catch (error) {
			console.log(error);
			if (error.response.status === 400) {
				customToast("warning", error.response.data.msg);
			} else {
				customToast("error", error.response.data.msg);
			}

			console.error("error saving product --> ", error.response);
		}
	};

	const uploadProps = {
		action: url("/upload/product"),
		method: "POST",
		multiple: false,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
		crossDomain: true,
		onStart(file) {
			console.log(file.name);
			// uploadWait(file.name);
		},
		onSuccess(result) {
			const PAYLOAD = { number: currentImage["x"], url: result.file.url };
			dispatch({
				type: ACTIONS.UPDATE_IMAGES,
				payload: PAYLOAD,
			});
			customToast(
				"success",
				`New Image Uploaded at ${currentImage["x"]}`
			);
			productSaveHandler();
		},
		onError(error) {
			console.log("onError", error);
		},
		beforeUpload(file, fileList) {
			console.log(file, fileList);
		},
	};

	const imageConfirmHandler = (x) => {
		const yesHandler = async () => {
			dispatch({
				type: ACTIONS.UPDATE_IMAGES,
				payload: { number: x, url: "" },
			});
			await productSaveHandler();
		};
		yesNO(x, yesHandler);
	};

	const repeatUpload = (x) => (
		<div className="card" key={x}>
			{state.images[x] ? (
				<>
					<div className="card__image">
						<img src={state.images[x]} alt="" />
					</div>
					<div className="card__control">
						<div className="card__control__button">
							<div>
								<Upload
									{...uploadProps}
									onClick={() => setCurrentImage({ x })}
								>
									<div className="card__upload__text">
										{`Upload image ${x}`}
									</div>
								</Upload>
							</div>
						</div>
						<div className="card__control__button ">
							<div
								className="card__upload__delete"
								onClick={() => imageConfirmHandler(x)}
							>
								delete
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="card__upload">
						<Upload
							{...uploadProps}
							onClick={() => setCurrentImage({ x })}
						>
							<div className="card__upload__text">
								{`Upload image ${x}`}
							</div>
						</Upload>
					</div>
				</>
			)}
		</div>
	);

	const ImageCard = () => (
		<div className="imagecard">
			<div className="imagecard__image">
				<img src={state.images[0]} alt="" />
			</div>
			<div className="imagecard__info">
				<div className="imagecard__info__title">{state.title}</div>
				<div className="imagecard__info__price">
					<div className="imagecard__info__price__base">{price}</div>
					<div className="imagecard__info__price__discounted">
						{discount_price}
					</div>
				</div>
				<div className="imagecard__info__description">{state.info}</div>
				<div className="imagecard__button">Add to Cart</div>
			</div>
		</div>
	);

	return (
		<div className="view">
			<Navbar />

			<div className="newproduct">
				<div className="newproduct__main">
					<ImageCard />
					<div className="split"></div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Title
						</label>
						<textarea
							type="text"
							className="split__input split__input-title"
							placeholder="...."
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_TITLE,
									payload: value,
								})
							}
							value={state.title.substring(0, 250)}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Info
						</label>
						<textarea
							type="text"
							className="split__input split__input-info"
							placeholder="...."
							onChange={({ target: { value } }) =>
								dispatch({
									type: ACTIONS.UPDATE_INFO,
									payload: value,
								})
							}
							value={state.info}
						/>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Product Price
						</label>
						<div className="split__input">
							{PriceBlock}
						</div>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Final Discounted Price
						</label>
						<div className="split__input">
							{DiscountPriceBlock}
						</div>
					</div>
					<div className="split">
						<label htmlFor="" className="split__title">
							Available Quantity
						</label>
						<div className="split__input">
							{AvailableQuantityBlock}
						</div>
					</div>

					<div>
						<div className="split">
							{[0, 1].map((x) => repeatUpload(x))}
						</div>
						<div className="split">
							{[2, 3].map((x) => repeatUpload(x))}
						</div>
						<div className="split">
							{[4, 5].map((x) => repeatUpload(x))}
						</div>
					</div>

					<button
						className="split__save"
						onClick={productSaveHandler}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
