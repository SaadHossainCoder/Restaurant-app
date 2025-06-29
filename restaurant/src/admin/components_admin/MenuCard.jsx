/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { MdDeleteOutline } from "react-icons/md";
import { deleteProduct } from "../../api";
const MenuCard = (props) => {
    const { id, image, name, price, description , massage } = props;

    const mutation = useMutation({
        mutationFn: async (id) => await deleteProduct(id),
        onSuccess: () => {
            window.location.reload();
            enqueueSnackbar("User deleted successfully!", { variant: "success" });

        },
        onError: () => {
            enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
    });
    // delete product handler
    const deleteUserHandler = () => {
        mutation.mutate(id);
        console.log(id);
    }

    

    return (
        <>
            {massage === "No products found" ? null : (
                <div className="w-70 h-75 bg-white rounded-md shadow-md flex flex-col items-center px-">
                    <img src={image} alt="Menu Item" className="w-full h-40 object-cover rounded-md mb-1 p-2" />
                    <h2 className="text-xl font-semibold mb-1">{name}</h2>
                    <p className=" w-2/2 whitespace-nowrap overflow-hidden text-ellipsis text-gray-600 mb-2 px-3">{description}</p>
                    <div className="flex  items-center  justify-between w-full px-5">
                        <p className="text-lg font-bold text-green-600">${price}</p>
                        <div className="flex gap-3">
                            <button className="mt-4 px-2 py-2 bg-[#056A68] text-white rounded-md hover:bg-[#045a5acf]">edit</button>
                            <button className="mt-4 px-2 py-2 bg-[#6a0505] text-white text-2xl rounded-md hover:bg-[#5a0404c0]" onClick={deleteUserHandler}><MdDeleteOutline /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MenuCard
