import { useEffect, useState } from "react";
//react-router-dom
import { NavLink, useNavigate } from "react-router";
//react-icons
import { BiCartAlt, BiSearch, BiChevronLeft } from "react-icons/bi";
//redux
import { useSelector } from "react-redux";
// import { addItemToCarte } from "../redux/slices/CarteSlice";
const Heder = (props) => {
    const [totalItems, setTotalItems] = useState(0);
    //redux
    const cartItems = useSelector((state) => state.carte.items);
    // Calculate total items in the cart

    useEffect(() => {
        if (cartItems?.length > 0) {
            setTotalItems(cartItems?.length);
        } else {
            setTotalItems(0);
        }
    }, [cartItems]);
    // eslint-disable-next-line react/prop-types
    const { name } = props;
    const navigate = useNavigate();
    return (
        <header className=" w-full h-full flex justify-center flex-col sticky top-0 z-10">
            <div className="w-full min-h-10 px-3 flex justify-between items-center sticky top-0 z-99 shadow-md bg-[#ffffff]">
                <div className="py-3 flex gap-5 font-sans ">
                    {/* left */}
                    <div onClick={() => navigate(-1)} className="text-[1.9rem] rounded-[50%] p-0.5 bg-[#eff2f8] cursor-pointer "><BiChevronLeft />
                    </div>

                    <h1 className="text-[1.3rem] font-bold pb-1 ">{name}</h1>
                </div>
                {/* right */}
                <div className="">
                    <div className="flex items-center gap-5 relative">

                        {
                            name === "My Cart" ? (
                                <NavLink to="/search">
                                    <div className="text-[1.5rem]  rounded-[50%] bg-[#eef3ff]   p-1.5 "><BiSearch /></div>
                                </NavLink>
                            ) : name === "Order Details" ? (
                                <NavLink to="/search">
                                    <div className="text-[1.5rem]  rounded-[50%] bg-[#eef3ff]   p-1.5 "><BiSearch /></div>
                                </NavLink>
                            ) : null
                        }

                        {name === "My Cart" ? (
                            null
                        ) : <NavLink to="/mycart">
                            <div className="text-[1.5rem]  rounded-[50%] bg-[#eef3ff]   p-1.5 relative "><BiCartAlt /><span className="absolute -top-0 right-1 text-[10px] bg-red-800 text-white px-1  rounded-full text-center font-light">{totalItems}</span></div>
                        </NavLink>}

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Heder

