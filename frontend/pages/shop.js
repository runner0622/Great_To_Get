import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Item from "../components/Cart/Item";
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { url, isEmpty, isNetworkError, useEffectAsync } from "../helper";
import { useRouter } from "next/router";

const ShopPage = () => {
	const [items, setItems] = useState({});
	const cartItems = useSelector((state) => state.shop.cart);
	const router = useRouter();

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/api/product/read"));
            console.log(url("/api/product/read"));
            console.log(result);
			setItems(result.data);
		} catch (error) {
			// if (isNetworkError(error)) {
			// 	return router.push("/error?500");
			// }
			console.log("could not fetch items");
		}
	}, []);

	return (
		<>
			<div className="title__lander title__lander-shop">
				Shopping Cart
			</div>
			{Object.keys(cartItems)?.length !== 0 && (
				<Link href="/checkout" className="nav_item">
					<div className="cart-icon">
						<FontAwesomeIcon
							icon={faShoppingCart}
							style={{ margin: "0 2px" }}
						/>
					</div>
				</Link>
			)}
			<div className="shop-page block">
				<div className="cart-container">
					{!isEmpty(items) ? (
						items.map((item, key) => {
							return (
								<Item
									key={key}
									info={item}
									showInfo={false}
									addedToCart={item._id in cartItems}
								/>
							);
						})
					) : (
						<FontAwesomeIcon
							icon={faSpinner}
							className="fa-spin"
							style={{ margin: "0 2px" }}
						/>
					)}
				</div>
				<h5 className="cart-no-more">No more items</h5>
			</div>
		</>
	);
}


export default ShopPage;
