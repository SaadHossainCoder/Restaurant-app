import { BiSearch } from "react-icons/bi"
import MenuCard from "../components_admin/MenuCard"
import { useState } from "react"
import Model_menu from "../components_admin/Model_menu";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api";

// loading 
import FullPageLoading from "../ui/FullPageLoader";

const Menu = () => {
    const [model, setModel] = useState(false);

    const { data, isError, isLoading } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            return await getAllProducts();
        },
    })
    if (isError) {
        console.error("Error fetching products");
        return <div>Error fetching products</div>;
    }
    if (isLoading) {
        return <FullPageLoading />;
    }


    return (
        <>
            {model && <Model_menu onClose={() => setModel(false)} />}
            <div className="row-start-1 row-end-2 w-full h-full col-span-4 mt-5 px-3  ">
                <h1 className="text-3xl font-bold ">Menu</h1>

                <div className="flex justify-between items-center mt-3">
                    <div className=" flex items-center ">
                        <input type="text" placeholder="Search..." className="px-5 py-2 rounded-l-md text-[13px] outline-0 font-p bg-white w-80 " />
                        <BiSearch className="text-4xl bg-white py-2 rounded-r-md" />
                    </div>
                    <button onClick={() => setModel(true)} className="flex justify-center bg-[#00650f] text-white p-2 rounded-md hover:bg-[#00650fc8] mr-10">Create Menu</button>
                </div>
                <div className="w-full h-165 mt-2 rounded-md overflow-y-scroll  flex flex-wrap gap-4">
                    {/* TODO : add edit menu to change details */}
                    {/* card */}
                    {Array.isArray(data?.data) &&
                        data?.data?.map((item) => (
                            <MenuCard
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}

export default Menu
