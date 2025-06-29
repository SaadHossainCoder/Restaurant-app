//react-hooks
import { useState } from "react";
//react-router-dom
import { NavLink } from "react-router-dom";
//react-components
import Heder from "../components/Layout/Heder";
import Card from "../components/ui/Card";
import Menu_card from "../components/ui/Menu_card";
//react-icons
import { BiSearch } from "react-icons/bi";
// import menuData from "../router/menu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api";

// loading 
import  FullPageLoading  from "../admin/ui/FullPageLoader";

//api import
// import { getAllProducts } from "../api/index";

const Home = () => {
    const [selected, setSelected] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    // // Data for the menu items
    const menuItems = [
        {
            title: "All",
            filteredProducts: "",
            image: "https://cdn-icons-png.flaticon.com/512/6774/6774898.png",
        },
        {
            title: "Popular",
            filteredProducts: "Popular",
            image: "https://cdn-icons-png.flaticon.com/512/5526/5526697.png",
        },
        {
            title: "Side-Dish",
            filteredProducts: "side-dish",
            image: "https://cdn-icons-png.flaticon.com/512/3114/3114276.png",
        },
        {
            title: "Fried Rice",
            filteredProducts: "Fried Rice",
            image: "https://cdn-icons-png.flaticon.com/512/4780/4780045.png",
        },
        {
            title: "Biryani",
            filteredProducts: "Biryani",
            image: "https://cdn-icons-png.flaticon.com/512/3361/3361969.png",
        },
        {
            title: "Roti",
            filteredProducts: "roti",
            image: "https://cdn-icons-png.flaticon.com/512/4681/4681969.png",
        },
        {
            title: "Roll",
            filteredProducts: "roll",
            // image: "https://cdn-icons-png.flaticon.com/512/4681/4681969.png",
            image: "https://cdn-icons-png.flaticon.com/512/7499/7499501.png",

        },
        {
            title: "Snacks & Starters",
            filteredProducts: "Snacks",
            image: "https://cdn-icons-png.flaticon.com/512/4681/4681965.png",
        },
        {
            title: "pizza & burger",
            filteredProducts: "pizza & burger",
            image: "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
        },
        {
            title: "Drinks",
            filteredProducts: "Drinks",
            image: "https://cdn-icons-png.flaticon.com/512/2434/2434933.png",
        },
        {
            title: "Coffee",
            filteredProducts: "Coffee",
            image: "https://cdn-icons-png.flaticon.com/512/924/924514.png",
        },
        {
            title: "Ice cream",
            filteredProducts: "Ice cream",
            image: "https://cdn-icons-png.flaticon.com/512/11899/11899746.png",
        },
    ];

    const { data, isError , isLoading } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            return await getAllProducts();
        },
        placeholderData: keepPreviousData,
    })
    if (isError) {
        console.error("Error fetching products");
        return <div className="text-red-500 text-center mt-10">Failed to load products.</div>;
    }
    if (isLoading) {
        return <FullPageLoading /> 
    };

    const products = Array.isArray(data?.data) && data?.data || [];

    const filteredProducts = products.filter(item => {
        const selectedMenuItem = menuItems[selected]; 
        if (selectedMenuItem.title === "All") {
            return true;
        }

        if (selectedMenuItem.title === "Popular") {
            return item.rating >= 4.5;
        }

        const categoryFilterText = searchTerm.toLowerCase().trim();
        if (categoryFilterText) {
            return item.category?.toLowerCase().includes(categoryFilterText);
        }

        return true;
    });

    return (
        <div className=" w-full h-full flex justify-center flex-col  ">
            <Heder name="Home" />
            {/*.......................... top .................................... */}
            <div className="h-full w-ful px-4 py-5 ">
                <h1 className="font-h1 text-3xl font-bold md:text-5xl">Find Your <br /><span className="text-[#c3540b]">Favorite food</span></h1>
            </div>

            <NavLink to="/search">
                <div className="h-full w-ful mx-4 py-2 pr-2 bg-gray-100 flex items-center rounded-2xl">
                    <div className="text-[1.5rem] text-gray-400 pl-3"><BiSearch /></div>
                    <p className=" rounded-md w-full px-2 py-1 font-medium text-gray-400 font-p text-[14px]">Find Your Food</p>
                </div>
            </NavLink>
            {/*............................ bottom ................................... */}
            <div className=" flex flex-col bg-[#ffffff] w-full h-full ">
                <div className="p-[10px] ">
                    {/* scroll menu */}
                    <section className="flex flex-col ">
                        <h1 className="text-[1rem] pt-5 pb-5  mx-5 font-black"> All Categories</h1>
                        <div className="flex overflow-x-scroll hide-scroll-bar pb-5 3xl:justify-center 3xl:items-center">
                            <div className="flex flex-nowrap">
                                {menuItems.map((item, index) => (
                                    <Menu_card
                                        key={index}
                                        id={index}
                                        title={item.title}
                                        image={item.image}
                                        selected={selected === index}
                                        onClick={() => {
                                            setSelected(index);
                                            setSearchTerm(item.filteredProducts.toLowerCase());
                                        }}
                                    />
                                ))}

                            </div>
                        </div>
                    </section>
                    {/* card */}
                    <h1 className="text-[1rem] px-4 font-black ">Open Restaurants</h1>
                    <section className="flex flex-wrap justify-center items-center gap-5 px-1 py-5">
                        {Array.isArray(data?.data) &&
                            filteredProducts.sort(() => Math.random() - 0.5)
                                .map((item) => (
                                    <NavLink key={item._id} to={`/Orderinfo/${item._id}`}>
                                        <Card
                                            key={item._id}
                                            id={item._id}
                                            title={item.name}
                                            image={item.image}
                                            description={item.description}
                                            price={item.price}
                                            rating={item.rating}
                                            foodType={item.foodType}
                                            category={item.category}
                                            time={item.time}
                                        />
                                    </NavLink>
                                ))
                        }{/* Shuffle categories */}
                    </section>
                </div>
            </div>

        </div>
    );
};

export default Home;
