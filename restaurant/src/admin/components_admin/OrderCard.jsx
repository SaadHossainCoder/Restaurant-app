import { useState } from "react";
import { BiCheckDouble } from "react-icons/bi"
//react-icons
import { BsPrinterFill } from "react-icons/bs";

const OrderCard = () => {
    const [isChecked, setIsChecked] = useState(true);
    
    const order = [{
        name: "Saad",
        orderId: "22414112k",
        date: "Wed, July 12, 2023",
        time: "06:12 pm",
        status: isChecked,
        stage: "Ready",
        table: "A4",
        items: [
            { item: "pizza", qty: 1, price: 300 },
            { item: "burger", qty: 2, price: 300 },
            { item: "pasta", qty: 1, price: 600 },
            { item: "pasta", qty: 1, price: 600 },
            { item: "pasta", qty: 1, price: 600 },
            { item: "pasta", qty: 1, price: 600 },
        ]
    }]
    return (
        <div className="flex flex-col w-93 h-90 bg-white rounded-md shadow-md p-4 mb-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white px-2 py-1.5 rounded-md bg-[#056A66]">A4</h2>

                    <div className="">
                        <h2 className="text-[16px] font-bold ">{order[0].name}</h2>
                        <p className="text-xs font-bold text-gray-400">order : {order[0].orderId}</p>
                    </div>
                </div>

                {<div className="">
                    <div className="flex items-center justify-center mr-1 bg-[#C9FFE6] rounded-md px-1 py-0.5 gap-1 ">
                        <BiCheckDouble className="font-black" />
                        <p className="text-[10px] pr-1 font-black "> Ready </p>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold flex items-center justify-center gap-0.5 font-sans mt-1">
                        <samp className="text-[14px] text-green-600 bg-green-600 h-1.5 w-1.5 rounded-full "></samp>
                        Ready to serve
                    </p>
                </div>}
            </div>
            <div className="flex justify-between items-center mt-2 pb-2 w-full border-b-2 border-gray-200">
                <p className="text-[11px] font-bold text-gray-500">{order[0].date}</p>
                <p className="text-[11px] font-bold text-gray-500">{order[0].time}</p>
            </div>
            <div className="w-full h-40 ">
                <div className="flex justify-between mt-2 pr-4.5">
                    <h1 className="text-[11px] font-bold text-gray-500">Item</h1>
                    <div className="flex items-center gap-25">
                        <h1 className="text-[11px] font-bold text-gray-500">Qty</h1>
                        <h1 className="text-[11px] font-bold text-gray-500">Price</h1>
                    </div>
                </div>
                <div className="h-30 overflow-y-auto hide-scroll-bar pb-2">
                    {
                        order[0].items.map((item, index) => (
                            <div key={index} className="flex justify-between mt-1.5 pr-4.5">
                                <h1 className="text-[13px] font-bold text-black ">{item.item}</h1>
                                <div className="flex items-center gap-23">
                                    <h1 className="text-[13px] font-bold text-black ">{item.qty}</h1>
                                    <h1 className="text-[13px] font-semibold text-black  w-10 text-end">₹ {item.price}</h1>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-between items-center border-t-2  border-zinc-200 pt-3 pr-2 ">
                <h1 className="text-[15px] font-bold text-black ">Total</h1>
                <p className="text-[15px] font-bold text-gray-500 text-end">₹ 1200.00</p>
            </div>
            <div className="flex justify-between  items-center pt-3 px-2  ">
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-2 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] active:brightness-90 active:translate-y-[2px]" onClick={() => setIsChecked(true)}>
                    Button
                </button>
                <button className="cursor-pointer transition-all bg-amber-700 text-white px-2 py-2 rounded-lg text-sm border-amber-900  border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] active:brightness-90 active:translate-y-[2px] flex items-center gap-1" onClick={() => setIsChecked(false)}>
                    <BsPrinterFill  className="text-2xl"  />
                    Print
                </button>
            </div>
            {order[0].status && <h1 className="absolute top-2 -left-5 w-20 text-center -rotate-45 text-white bg-green-600 shadow-md -translate-y-[1px]">New</h1>}
        </div>
    )
}

export default OrderCard
