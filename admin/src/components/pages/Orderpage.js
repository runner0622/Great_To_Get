import React, { useState } from "react";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync } from "../../helper";
import customToast from "../blocks/swal/customToast";



const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [forceRenderCount, setForceRenderCount] = useState(0);
    const [buttonState, setButtonState] = useState("");

    useEffectAsync(async () => {
        try {
            const result = await axios.get(url("/order/xread"), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });
            setOrders(result.data.msg);
        } catch (error) {
            setOrders([]);
        }
    }, [forceRenderCount]);

    const orderStatusChangeHandler = async (id) => {
        try {
            const BearerToken = `Bearer ${localStorage.getItem("accessToken")}`;
            const updateRes = await axios.post(
                url("/order/update"),
                {
                    orderId: id,
                },
                {
                    headers: {
                        Authorization: BearerToken,
                    },
                }
            );

            customToast("success", "order updated");
            setButtonState(updateRes.data.nextStatus)


        } catch (error) {
            console.log(error.response);
        }
    };

    const renderorders = () => {
        if (orders) {
            return orders.map((order, index) => {
                return (
                    <div className="order__item order" key={index}>
                        <div className="order__item__id">
                            {String(order._id).slice(17)}
                        </div>
                        <div className="order__item__name">
                            {order.order_name}
                        </div>
                        <div className="order__item__paidstatus">
                            {order.items_ordered}
                        </div>
                        <div className="order__item__amountpaid">
                            {order.amount_paid}
                        </div>
                        <div className="order__item__address">
                            {order.address}
                        </div>
                        <div
                            className="order__item__delete"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <button
                                className="button button-save"
                                onClick={() => {
                                    orderStatusChangeHandler(
                                        order._id,
                                        order.order_name
                                    );

                                }}
                            >
                                {buttonState || order.track}
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
            <div className="wrapper_order">
                <div className="order">
                    <div className="order__item order__header">
                        <div className="order__item__id">ID</div>
                        <div className="order__item__name">Order Name</div>
                        <div className="order__item__paidstatus">
                            Items Ordered
                        </div>
                        <div className="order__item__amountpaid">
                            Amount Paid
                        </div>
                        <div className="order__item__address">Address</div>
                        <div className="order__item__delete">Action</div>
                    </div>

                    {renderorders()}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
