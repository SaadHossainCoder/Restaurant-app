
export default function Successfull() {
    
    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <main className="bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col relative overflow-hidden">
                {/* Top scalloped border */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-b-[20px] shadow-inner">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#f9fafb"
                            d="M0 20 A10 10 0 0 1 20 20 A10 10 0 0 1 40 20 A10 10 0 0 1 60 20 A10 10 0 0 1 80 20 A10 10 0 0 1 100 20 L100 0 L0 0 Z"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    </svg>
                </div>
                {/* Content */}
                <div className="p-6 pt-10 flex flex-col gap-4 text-gray-900 font-sans">
                    {/* Success icon */}
                    <div className="flex justify-center">
                        <div className="bg-teal-400 rounded-full p-3">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    {/* Header text */}
                    <h1 className="text-center text-xl font-semibold text-teal-700">
                        Order Successfull
                    </h1>
                    <p className="text-center font-medium text-base">
                        Table No: <span className="font-bold">03</span>
                    </p>
                    <div className="flex justify-around items-center gap-2">
                    {(<p className="text-center text-red-600 font-semibold text-sm uppercase">
                        NOT PAID
                    </p>)}
                    <p className="text-center text-green-600 font-semibold text-sm uppercase">
                        PAID
                        new
                    </p>
                        </div>
                    {/* Date and ID */}
                    <div className="text-sm text-gray-600 leading-5">
                        <p>
                            Date: <span className="font-semibold">{}</span>
                        </p>
                        <p>
                            ID: <span className="font-semibold">#4485933</span>
                        </p>
                        <div className="flex justify-between items-center mt-2">
                            <p>
                            Name: <span className="font-semibold">John Doe</span>
                            </p>
                            <p>
                            Mobil No: <span className="font-semibold">1234567890</span>
                            </p>
                        </div>
                    </div>

                    {/* Order details */}
                    <section className="">
                        <p className="font-bold text-gray-900 mb-2 ">Order Details</p>
                        <div className="flex flex-col gap-1.5 text-gray-800 pr-2 overflow-y-scroll h-44 ">
                            {[
                                { name: "Easy Spanish Chicken", price: 20, quantity: 2 },
                                { name: "Paradise Hyderabad Biryani", price: 13, quantity: 2 },
                                { name: "Butter Naan", price: 16, quantity: 5 },
                                { name: "Butter Naan", price: 16, quantity: 5 },
                                { name: "Butter Naan", price: 16, quantity: 5 },
                                { name: "Butter Naan", price: 16, quantity: 5 },
                                { name: "Butter Naan", price: 16, quantity: 5 },
                            ].map((item, idx) => (
                                <div className="flex justify-between" key={idx}>
                                    <span>{item.name} <br />
                                    <span className="text-gray-500 text-sm">
                                    Qty: {item.quantity}
                                    </span>
                                    </span>
                                    <span className="font-medium">₹{item.price}.0</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tax/Charges and total */}
                    <section className="mt-1 border-t border-gray-300 pt-3 text-gray-800 text-sm font-semibold">
                        <div className="flex justify-between">
                            <span>TAX/Charges</span>
                            <span>₹10.0</span>
                        </div>
                        <div className="flex justify-between text-lg font-extrabold mt-1">
                            <span>Total Amount</span>
                            <span>₹62.0</span>
                        </div>
                    </section>

                    {/* Buttons */}
                    <section className="mt-8 flex flex-col gap-3">
                        <button
                            className="bg-black text-white rounded-md py-3 w-full font-semibold hover:bg-gray-900 transition"
                            type="button"
                        >
                            PAY FULL AMOUNT
                        </button>
                    </section>
                </div>
                {/* Bottom scalloped border */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-t-[20px] shadow-inner rotate-180">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#f9fafb"
                            d="M0 20 A10 10 0 0 1 20 20 A10 10 0 0 1 40 20 A10 10 0 0 1 60 20 A10 10 0 0 1 80 20 A10 10 0 0 1 100 20 L100 0 L0 0 Z"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    </svg>
                </div>
            </main>
        </div>
    );
}

