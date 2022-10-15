import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShoppingCart,
	faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { addSingleItemToCart } from "../../redux/actions/CartCreator";
import { useDispatch } from "react-redux";

function Item({ info, addedToCart, showInfo }) {
	const dispatch = useDispatch();

	return (
		<div className="imagecard">
			<div className="imagecard__image">
				<img src={info.images[0]} alt={info.title} />
			</div>
			<div className="imagecard__info">
				<div className="imagecard__info__title">{info.title}</div>
				<div className="imagecard__info__price">
					<div className="imagecard__info__price__base">
						{info.price}
					</div>
					<div className="imagecard__info__price__discounted">
						{info.discount_price}
					</div>
				</div>
				<div className="imagecard__info__description">{info.info}</div>
				<div
					className={`imagecard__button ${
						addedToCart && "imagecard__button-exists"
					}`}
					onClick={() => {
						dispatch(addSingleItemToCart(info));
					}}
				>
					{addedToCart ? (
						<>
							<FontAwesomeIcon
								icon={faShoppingBag}
								style={{ margin: "0 2px" }}
							/>
							Already In Cart
						</>
					) : (
						<>
							<FontAwesomeIcon
								icon={faShoppingCart}
								style={{ margin: "0 2px" }}
							/>
							Add to Cart
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Item;
