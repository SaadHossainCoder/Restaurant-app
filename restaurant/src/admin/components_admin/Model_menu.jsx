import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
//react icons
import { RxCross2 } from "react-icons/rx";
import { createProduct } from "../../api";

const Model_menu = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onClose } = props;
    const [menu, setMenu] = useState({
        image: "",
        name: "",
        description: "",
        price: "",
        rating: "",
        time: "",
        category: "",
        foodType: "",
        // ingredients: "",

    });

    const handleChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value,
        });
    }

    const menuMutation = useMutation({
        mutationFn: async (data) => await createProduct(data),
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: "success" });
            window.location.reload();
            onClose();
        },
        onError: (err) => {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
            onClose();
        }
        
    })

    const submitHandler = (e) => {
        e.preventDefault();
        menuMutation.mutate(menu); // <-- send data first
        setMenu({
            image: "",
            name: "",
            description: "",
            price: "",
            rating: "",
            time: "",
            category: "",
            foodType: "",
            // ingredients: "",
        });
        onClose();
    }



    return (
        <div className="fixed inset-0 bg-[#00000098]  p-10  flex justify-center items-center z-50" >
            <div className="w-400 ">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Create Product
                                    </p>
                                    <RxCross2 className="text-3xl hover:bg-zinc-100 rounded-full p-1 cursor-pointer" onClick={onClose} />
                                </div>
                                <div className="flex flex-col gap-3 h-100 overflow-y-scroll pb-5 " >
                                    {/* image input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Image URL
                                        </label>
                                        <input placeholder="Enter Product image URL"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0" id="image" type="url"
                                            name="image"
                                            value={menu.image}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* name input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Name
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                            placeholder="Enter Product name" id="name" type="name"
                                            name="name"
                                            value={menu.name}
                                            onChange={handleChange}
                                            required

                                        />
                                    </div>
                                    {/* description input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Description
                                        </label>
                                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                            rows="5"
                                            maxLength={500}
                                            placeholder="Enter Product description" id="description" type="text"
                                            name="description"
                                            value={menu.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* price input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Price
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                            placeholder="Enter Product price" id="price" type="text"
                                            name="price"
                                            value={menu.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* rating input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Rating
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                            placeholder="Enter Product rating" id="rating" type="text"
                                            name="rating"
                                            value={menu.rating}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* time input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Time (in minutes)
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                            placeholder="Enter Product time" id="time" type="text"
                                            name="time"
                                            value={menu.time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* category input */}
                                    <div className="px-0.5">
                                        <p className="block mb-2 text-sm font-medium text-gray-900">
                                            Category
                                        </p>
                                        <select
                                            name="category"
                                            className="text-md flex-1 px-1 py-1.5 ring-1 ring-gray-400 rounded-md outline-none w-full cursor-pointer"
                                            id="category"
                                            value={menu.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="fried rice">fried rice</option>
                                            <option value="Biryani">Biryani</option>
                                            <option value="side-dish">Side-Dish</option>
                                            <option value="roll">roll</option>
                                            <option value="roti">roti</option>
                                            <option value="snacks">snacks</option>
                                            <option value="pizza & burger">pizza & burger</option>
                                            <option value="drinks">drinks</option>
                                            <option value="coffee">coffee</option>
                                            <option value="ice cream">ice cream</option>
                                        </select>
                                    </div>
                                    {/* foodType input */}
                                    <div className="px-0.5">
                                        <p className="block mb-2 text-sm font-medium text-gray-900">
                                            FoodType
                                        </p>
                                        <select
                                            name="foodType"
                                            className="text-md flex-1 px-1 py-1.5 ring-1 ring-gray-400 rounded-md outline-none w-full cursor-pointer"
                                            id="foodType"
                                            value={menu.foodType}
                                            onChange={handleChange}
                                            required

                                        >
                                            <option value="">Select foodType</option>
                                            <option value="vegetarian">vegetarian</option>
                                            <option value="non-vegetarian">non-vegetarian</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-5">
                                    <button className="w-full border-2 border-zinc-400 hover:bg-zinc-400 text-zinc-400  rounded-lg text-sm px-5 py-2.5  text-center  hover:text-white outline-0 cursor-pointer" onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button
                                        className="w-full bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Model_menu

