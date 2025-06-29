//react-router-dom
import { useNavigate, useParams } from "react-router-dom";
//react-hooks
import { useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query";
//react-component
import Heder from "../components/Layout/Heder"
//react-icons
import { BiStar, BiPlus, BiMinus, BiFoodTag, BiTimeFive } from "react-icons/bi";
//api
import { getProductById } from "../api";
import { enqueueSnackbar } from "notistack";
//redux
import { useDispatch } from "react-redux";
import { addItemToCarte } from "../redux/slices/CarteSlice";
// lading 
import FullPageLoading from "../admin/ui/FullPageLoader";
const OrderDetails = () => {
    const navigate = useNavigate();
    //redux
    const dispatch = useDispatch();
    const scrolLRef = useRef();
    //auto scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [count, setCount] = useState(0)

    const increment = () => setCount(prevCount => prevCount + 1);

    const decrement = () => {
        if (count === 1) return;
        setCount(prevCount => prevCount - 1);
    };

    //get id from url
    const { id } = useParams();

    //LEARN : auto scroll load to top 
    useEffect(() => {
        if (scrolLRef.current) {
            scrolLRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }, [id]);

    //fetch product by id
    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => await getProductById(id),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })
    if (isLoading) return <FullPageLoading />;
    if (isError) return <div className="w-full h-screen flex justify-center items-center capitalize">Something went wrong!</div>

    const product = data?.data?.product;

    if (!product) return <div className="w-full h-screen capitalize flex justify-center items-center">Product not found!</div>

    const OrderSubmitHandler = (e) => {
        e.preventDefault();
        // Validate quantity
        if (count <= 0) {
            enqueueSnackbar("Quantity must be greater than 1", { variant: "error" });
            return;
        }
        // Build order item
        const orderDetails = {
            _id: product._id, // important for removing later
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: count,
            totalPrice: product.price * count,
        };
        // Add to Redux cart
        dispatch(addItemToCarte(orderDetails));
        enqueueSnackbar("Item added to cart!", { variant: "success" });
        navigate("/");
    };

    return (
        <div className=" flex flex-col justify-center items-center">
            <Heder name="Order Details" />
            <div className="w-full h-full md:w-150">
                <div className="w-full h-full px-3 pt-5 flex flex-col ">
                    <h1 className="mt-2 mb-3 w-full text-2xl font-extrabold pl-3">{product?.name}</h1>
                    <div className="w-full shadow-lg overflow-hidden shadow-gray-800/30 rounded-2xl flex ">
                        <img className="w-full h-full object-cover" src={product?.image} alt={product?.name} />
                    </div>
                    <div className="w-full h-full mt-6 flex items-center justify-around">
                        <div className="w-85 h-full flex items-center justify-between  ">
                            <div className=" flex justify-between items-center rounded-[5px]  px-2 gap-1.5">
                                <BiStar className="text-[21px] text-amber-500 font-bol" />
                                <h1 className="   py-0.5  flex justify-center items-center font-bold font-sans ">{product?.rating}</h1>
                            </div>
                            <div className=" flex justify-between items-center rounded-[5px] px-2 gap-1.5">
                                <BiTimeFive className="text-[21px] text-amber-500 font-bol" />
                                <h1 className=" py-0.5  flex justify-center items-center  font-sans font-medium text-[0.8rem] ">{product?.time} min</h1>
                            </div>
                            {product?.foodType === "vegetarian" && <div className=" flex justify-between items-center rounded-[5px]  px-2 gap-1.5">
                                <BiFoodTag className="text-[21px] text-green-700 font-bol" />
                                <h1 className=" py-0.5  flex justify-center items-center  font-sans font-medium text-[0.8rem] ">{product?.foodType}</h1>
                            </div>}{
                                product?.foodType === "non-vegetarian" && <div className=" flex justify-between items-center rounded-[5px]  px-2 gap-1.5">
                                    <BiFoodTag className="text-[21px] text-red-700 font-bol" />
                                    <h1 className=" py-0.5  flex justify-center items-center  font-sans font-medium text-[0.8rem] ">{product?.foodType}</h1>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="w-full h-full mt-7 font-sans flex justify-between items-center pl-5 pr-4">
                        <h1 className=" text-xl md:text-2xl font-bold text-amber-900">{product?.price}₹</h1>
                        <div className="flex justify-between items-center gap-1">

                            <button className="px-1.5 text-[17px] py-1.5 rounded-[5px] flex justify-center items-center border-2  bg-[#943b00] text-white cursor-pointer" onClick={decrement}><BiMinus /></button>

                            <h1 className="font-bold px-1 text-[17px] py-1 rounded-[5px] flex justify-center items-center w-7">{count}</h1>

                            <button className="px-1.5 text-[17px] py-1.5 rounded-[5px] flex justify-center items-center border-2  bg-[#943b00] text-white cursor-pointer" onClick={increment}><BiPlus /></button>

                        </div>
                    </div>
{/* //LEARN : "capitalize" this is make fast letter is capital  */}
                    <div className="w-full mt-5 mb-10">
                        <h1 className="text-[1.2rem] capitalize px-1 font-bold">category</h1>
                        <p className="font-p capitalize  mt-2 px-4 mb-4">
                            {product?.category}
                        </p>
                        <h1 className="text-[1.2rem] px-1 font-bold">Details</h1>
                        <p className="font-p text-[0.8rem] mt-2 px-4">
                            {product?.description}
                        </p>
                    </div>
                </div>

            </div>
            <div className="w-full flex justify-center items-center sticky bottom-0 bg-white px-10  md:px-20 lg:px-30 xl:px-40 pb-5 pt-3  shadow-[0px_-2px_6px_rgba(156,156,156,0.2)] ">
                <div className=" w-full h-full flex justify-between items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className=" font-bold text-2xl md:text-2xl">{product?.price * count} ₹</h1>
                    </div>
                    <button className="px-5 py-3 text-white rounded-2xl bg-amber-800  shadow-lg shadow-amber-800/35" onClick={OrderSubmitHandler}>ADD TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
