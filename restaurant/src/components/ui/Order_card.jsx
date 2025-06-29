/* eslint-disable react/prop-types */
//react-hooks
import { useState } from "react";
//react-icons
import { BiTrash } from "react-icons/bi";
//redux
import { useDispatch } from "react-redux";
import { removeItemFromCarte, updateItemInCarte } from "../../redux/slices/CarteSlice";

const Order_card = (props) => {
    const { id, image, name, price, quantity } = props;
    const dispatch = useDispatch();

    const [count, setCount] = useState(quantity);
    

    const increment = () => {
        if ( count >= 10) return;
        setCount(count + 1);
        dispatch(updateItemInCarte({ _id: id, quantity: count+1 }));
        console.log(count);
        
    };

    const decrement = () => {
        if (count === 1 ) return;
        setCount(count - 1);
        dispatch(updateItemInCarte({ _id: id, quantity: count-1 }));
        console.log(count);
        
    };

    const handleRemove = () => {
        dispatch(removeItemFromCarte(id));
    };

    return (
        <div className="bg-[#fcfcfc] shadow-md w-full min-h-20 rounded-[9px] flex items-center">
            <div className="w-40 p-3">
                <img src={image} alt="img" className="rounded-2xl" />
            </div>
            <div className="p-3 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-[1rem] font-bold pb-1">{name}</h1>
                    <p className="text-sm font-bold pb-1 text-gray-400">Item: {quantity}</p>
                </div>
                <p className="text-[0.8rem] text-[#9c9c9c]">Price: {price}.00 ₹</p>
                <div className="flex justify-between items-center pt-1">
                    <div className="flex justify-center items-center">
                        <button className="px-2 text-[20px] h-7 bg-[#e8e8e8] rounded-[5px]" onClick={increment}>+</button>
                        <h1 className="px-2 text-[20px]">{count}</h1>
                        <button className="px-2.5 text-[20px] font-black h-7 bg-[#e8e8e8] rounded-[5px]" onClick={decrement}>-</button>
                    </div>
                    <div>
                        <button
                            onClick={handleRemove}
                            className="px-2 text-[17px] py-2 text-white bg-[#cc0000] rounded-[5px] flex justify-center items-center"
                        >
                            <BiTrash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order_card;
