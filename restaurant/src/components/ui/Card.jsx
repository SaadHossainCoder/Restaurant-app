/* eslint-disable react/prop-types */
import { BiSolidStar, BiFoodTag } from "react-icons/bi";
const Card = (props) => {
    const { title, image, rating, price, description, foodType, time, category } = props;
    return (
        //LEARN hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 
        <div className="hover:shadow-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-3d ">
            <div className=" w-85 shadow-xl rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ">
                {/* top */}
                <div className="relative w-full  h-[12rem] overflow-hidden" >
                    <img
                        src={image}
                        alt={`${image}`} className="rounded-lg w-[100%] object-cover" />
                    <i className='bx bx-heart absolute top-0 right-0 p-1 border-2 rounded-4xl m-3 text-[20px] text-white'></i>
                    {foodType === "vegetarian" && <div className="absolute bottom-0 left-0 px-3 py-1 rounded-t-md bg-[#ffffff] text-green-700 flex justify-center items-center gap-1 text-[12px]">
                        <BiFoodTag className="text-xl" />
                        <p className="font-bold">{foodType}</p>
                    </div>}:{
                        foodType === "non-vegetarian" && <div className="absolute bottom-0 left-0 px-3 py-1 rounded-t-md bg-[#ffffff] text-red-700 flex justify-center items-center gap-1 text-[12px]">
                            <BiFoodTag className="text-xl" />
                            <p className="font-bold">{foodType}</p>
                        </div>
                    }

                    {rating >= 4 && <div className="absolute top-0 left-0 px-2 py-1 mt-2 ml-2 rounded-full bg-[#00000044] text-[#ffffff] flex justify-center items-center gap-1 text-[12px]">
                        <p className="font-bold">Popular</p>
                    </div>
                    }

                </div>
                {/* bottom */}
                <div className=" px-3.5 py-3 ">
                    <div className=" flex justify-between items-center mb-2">
                        <h1 className=" text-[1rem] font-semibold ">{title}</h1>
                        <h1 className="text-[14px] px-1 text-white rounded-[5px] bg-green-800 flex justify-center items-center gap-1">{rating || "4.5"}
                            <BiSolidStar className="text-[12px]" />
                        </h1>
                    </div>
                    <p className="text-[12px] font-p text-zinc-700 w-2/2 whitespace-nowrap overflow-hidden text-ellipsis pr-10">{category}</p>
                    <p className="text-[12px] font-p text-gray-400 w-2/2 whitespace-nowrap overflow-hidden text-ellipsis pr-10">{description}</p>
                    <div className="flex justify-between items-center py-[1px] ">
                        <h1 className="text-[16px] font-semibold  text-[#d37f00] font-sans ">{`${price}.00₹`}</h1>
                        <h1 className="text-[12px] font-semibold text-[#bcbcbc]  ">{time} min</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;