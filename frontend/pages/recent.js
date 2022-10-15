import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import prettyMS from "pretty-ms";
import { isNetworkError, url } from "../helper";
import { useRouter } from "next/router";
import axios from "axios";
import { recentUpdatedTimestamp } from "../redux/actions/CartCreator";

// const trackOrderHandler = () => {
//     Swal.fire({
//         title: "Enter Tracking ID",
//         input: "text",
//         inputAttributes: {
//             autocapitalize: "off",
//         },
//         showCancelButton: true,
//         confirmButtonText: "Look up",
//         showLoaderOnConfirm: true,
//         preConfirm: async (data) => {
//             try {
// const apiResult = await axios.post(
//     url("/api/order/track"),
//     {
//         order_id: data,
//     }
// );
//                 if (apiResult.data.success === "success") {
//                     Swal.fire({
//                         title: apiResult.data?.tracking_status,
//                     });
//                 }
//             } catch (error) {
//                 Swal.fire({
//                     title: "Enter Correct Tracking ID",
//                 });
//             }
//         },
//         allowOutsideClick: () => !Swal.isLoading(),
//     });
// };

const RecentPage = () => {
	const recent = useSelector((state) => state.shop.recent_order);
	const recent_updated_timestamp = useSelector(
		(state) => state.shop.recent_updated_timestamp
	);
	const [recentResult, setRecentResult] = useState({});
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(async () => {
		const timeInMinutes =
			(Date.now() - recent_updated_timestamp) / 1000 / 60;

		if (timeInMinutes > 30) {
			try {
				recent.map(async (item) => {
					const apiResult = await axios.post(
						url("/api/order/track"),
						{
							order_id: item.order_id,
						}
					);

					if (apiResult.data.success === "success") {
						setRecentResult({
							...recentResult,
							[item.order_id]: apiResult.data.tracking_status,
						});

						dispatch(recentUpdatedTimestamp());
					}
				});
			} catch (error) {
				if (isNetworkError(error)) {
					router.push("/error?500");
				}
				console.log(error);
			}
		} else {
			recent.map((item) => {
				setRecentResult({
					...recentResult,
					[item.order_id]: item.track,
				});
			});
		}
	}, []);

	return (
		<>
			<div className="title__lander title__lander-recent">
				Recent Orders
			</div>
			<div className="block">
				<div className="recent-order">
					<div className="recent-order-group">
						{recent.map((order) => (
							<div key={order.id} className='recent-order-item'>
								<div className="recent-order-item-id">
									<label>Order Id</label>
									<div>{order.order_id}</div>
								</div>
								<div className="recent-order-item-amount">
									<label>Amount</label>
									<div>{order.amount}</div>
								</div>
								<div className="recent-order-item-timestamp">
									<label>Amount</label>
									<div>
										{new Date(
											order.timestamp
										).toLocaleString("en-us", {
											weekday: "long",
											year: "numeric",
											mondiv: "short",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
								<div className="rrecent-order-item-status">
									<label>Status</label>
									<div>{order.track}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default RecentPage;
