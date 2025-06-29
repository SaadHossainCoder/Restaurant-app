//react-hooks
import { useState } from "react";
//react-icons
import { BiSearch } from "react-icons/bi";
import OrderCard from "../components_admin/OrderCard";
const Order = () => {
    const [activeButton, setActiveButton] = useState(1);

    const handleClick = (id) => {
        setActiveButton(id);
    };
    return (
        <div className="row-start-1 row-end-2 w-full h-full col-span-4 mt-5 px-5  ">
            <h1 className="text-3xl font-bold ">Order</h1>
            <div className="flex justify-between items-center">
                <div className="mt-2 flex gap-2">
                    <button
                        onClick={() => handleClick(1)}
                        className={`px-4 py-2 rounded ${activeButton === 1 ? "bg-[#056A68] px-2 py-1 rounded-md text-[13px] text-white font-p" : "bg-white px-2 py-1 rounded-md text-[13px]  font-p hover:bg-[#056A68] hover:text-white cursor-pointer"
                            }`}
                    >All</button>
                    <button onClick={() => handleClick(2)}
                        className={`px-4 py-2 rounded ${activeButton === 2 ? "bg-[#056A68] px-2 py-1 rounded-md text-[13px] text-white font-p" : "bg-white px-2 py-1 rounded-md text-[13px]  font-p hover:bg-[#056A68] hover:text-white cursor-pointer"
                            }`}>New Order</button>
                    <button onClick={() => handleClick(3)}
                        className={`px-4 py-2 rounded ${activeButton === 3 ? "bg-[#056A68] px-2 py-1 rounded-md text-[13px] text-white font-p" : "bg-white px-2 py-1 rounded-md text-[13px]  font-p hover:bg-[#056A68] hover:text-white cursor-pointer cursor: none"
                            }`}>On Process</button>
                    <button onClick={() => handleClick(4)}
                        className={`px-4 py-2 rounded ${activeButton === 4 ? "bg-[#056A68] px-2 py-1 rounded-md text-[13px] text-white font-p" : "bg-white px-2 py-1 rounded-md text-[13px]  font-p hover:bg-[#056A68] hover:text-white cursor-pointer"
                            }`}>Completed</button>
                </div>
                <div className=" flex items-center">
                    <input type="text" placeholder="Search..." className="px-5 py-2 rounded-l-md text-[13px] outline-0 font-p bg-white w-80 " />
                    <BiSearch className="text-4xl bg-white py-2 rounded-r-md" />
                </div>
            </div>
            <div className="w-full h-165 mt-4 rounded-md overflow-y-scroll  flex flex-wrap gap-4">
                <OrderCard />
                <OrderCard />

            </div>
        </div>
    )
}

export default Order
