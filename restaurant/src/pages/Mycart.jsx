import { useSelector } from "react-redux";
import { useState } from "react";

// Components
import Heder from "../components/Layout/Heder";
import Order_card from "../components/ui/Order_card";
import Model_userInfo from "../components/model/Model_userInfo";

const Mycart = () => {
    const cartItems = useSelector((state) => state.carte.items) || [];
    const [model, setModel] = useState(false);

    // Calculate totals
    const cartTotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    const tax = 10; // 10% tax
    const discount = cartTotal > 500 ? 50 : 0;
    const subtotal = cartTotal + tax - discount;

    return (
        <>
            {model && <Model_userInfo onClose={() => setModel(false)} />}

            <div className="w-full min-h-screen md:px-10 py-4 flex flex-col items-center bg-[#f9f9f9]">
                <div className="w-full max-w-5xl">
                    <Heder name="My Cart" />

                    {/* Order List Section */}
                    <div className="w-full">
                        <h1 className="text-[1.3rem] font-bold py-3 ml-4">My Order List</h1>

                        <section className="h-[400px] overflow-y-auto pr-2 hide-scroll-bar">
                            <div className="flex flex-col gap-4">
                                {cartItems.length === 0 ? (
                                    <h2 className="text-center py-10 text-gray-400">Your cart is empty.</h2>
                                ) : (
                                    cartItems.map((item, idx) => (
                                        <Order_card
                                            key={item._id || idx}
                                            id={item._id}
                                            name={item.name}
                                            image={item.image}
                                            price={item.price}
                                            quantity={item.quantity}
                                            totalPrice={item.totalPrice}
                                        />
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Payment Summary Section */}
                    <section className="mt-6 bg-white rounded-xl shadow-md p-5">
                        <h1 className="text-[1.2rem] font-bold mb-4">Payment Summary</h1>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-green-700">
                                <span>Estimated Sales Tax (10%)</span>
                                <span>₹{tax}</span>
                            </div>
                            <div className="flex justify-between text-red-700">
                                <span>Discount</span>
                                <span>- ₹{discount}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-3 border-t border-dotted mt-2">
                                <span>Estimated Total</span>
                                <span>₹{subtotal}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="mt-6">
                            <button
                                className={`w-full py-4 text-white rounded-2xl bg-amber-900 shadow-md ${cartItems.length === 0 ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                                disabled={cartItems.length === 0}
                                onClick={() => setModel(true)}
                            >
                                {cartItems.length === 0 ? "Cart is empty" : "Proceed to Checkout"}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Mycart;
