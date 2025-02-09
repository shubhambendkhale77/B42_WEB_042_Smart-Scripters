import { useContext } from "react";
import { AuthContext } from "../../context/useAuth";

const OrderDetail = () => {
    const context = useContext(AuthContext);
    const { getAllOrder, deleteOrder } = context;

    return (
        <div>
            <div className="py-5">
                {/* Heading */}
                <h1 className="text-xl text-pink-300 font-bold">All Orders</h1>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            {[
                                "S.No.", "Order Id", "Image", "Title", "Category",
                                "Price", "Quantity", "Total Price", "Status", "Name",
                                "Address", "Pincode", "Phone Number", "Email", "Date", "Action"
                            ].map((heading, index) => (
                                <th key={index} className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    {heading}
                                </th>
                            ))}
                        </tr>

                        {/* Map through all orders */}
                        {getAllOrder?.map((order, orderIndex) =>
                            order?.cartItems?.map((item, itemIndex) => {
                                const { id, productImageUrl, title, category, price, quantity } = item;

                                return (
                                    <tr key={`${order.id}-${id}`} className="text-pink-300">
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{itemIndex + 1}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order.id}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">
                                            <img src={productImageUrl} alt="Product" className="w-10 h-10" />
                                        </td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{title}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{category}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">₹{price}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{quantity}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">₹{price * quantity}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100 text-green-600">{order?.status}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.addressInfo?.name}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.addressInfo?.address}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.addressInfo?.pincode}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.addressInfo?.mobileNumber}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.email}</td>
                                        <td className="h-12 px-6 border-t border-l border-pink-100">{order?.date}</td>
                                        <td
                                            onClick={() => deleteOrder(order.id)}
                                            className="h-12 px-6 border-t border-l border-pink-100 text-red-500 cursor-pointer"
                                        >
                                            Delete
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
