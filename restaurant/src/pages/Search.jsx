import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Heder from "../components/Layout/Heder";
import Card from "../components/ui/Card";
import { getAllProducts } from "../api";

// loading 
import FullPageLoading from "../admin/ui/FullPageLoader";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isError, isLoading } = useQuery({
        queryKey: ["allproducts"],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    if (isError) {
        console.error("Error fetching products");
        return <div className="text-red-500 text-center mt-10">Failed to load products.</div>;
    }
    if (isLoading) {
        return <FullPageLoading />;
    }

    const search =  Array.isArray(data?.data) && data?.data || [];

    const filteredProducts = search.filter((item) =>
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered Products:", filteredProducts);

    return (
        <div className="w-full h-full">
            <Heder name="Search" />

            <section className="w-full h-full px-3 py-5 flex flex-col mt-3">
                {/* Search Bar */}
                <form className="flex justify-center items-center px-2 gap-1">
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-gray-700 border-2 border-white rounded-md focus:outline-none focus:border-gray-200 shadow-md shadow-gray-500/35"
                        placeholder="Search for food, drinks, or dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="bx bx-search-alt text-2xl bg-amber-800 p-4 rounded-2xl shadow-md shadow-gray-500/35 text-white"></i>
                </form>

                {/* Search Results */}
                <div className="flex flex-col w-full h-full mt-7 font-bold px-3">
                    <h1 className="">Search Details</h1>
                    <div className="flex flex-col w-full h-full">
                        {isLoading ? (
                            <div className="text-center py-10 text-gray-500">Loading...</div>
                        ) : searchTerm.trim().length > 0 ? (
                            <section className="flex flex-wrap justify-center items-center gap-5 px-1 py-5">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <NavLink key={item._id} to={`/Orderinfo/${item._id}`}>
                                            <Card
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
                                ) : (
                                    <div className="text-center py-10 text-gray-400">No matching items found.</div>
                                )}
                            </section>
                        ) : (
                            <div className="text-center w-full py-10 text-gray-500">Type to search for products.</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Search;
