
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteUser } from "../../api";
import { useSelector } from "react-redux";

const UserCard = (props) => {
    const userData = useSelector((state) => state.user);
    // eslint-disable-next-line react/prop-types
    const { name, role, id } = props;

    const mutation = useMutation({
        mutationFn: async (id) => await deleteUser(id),
        onSuccess: () => {
            window.location.reload();
            enqueueSnackbar("User deleted successfully!", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
    });

    // delete user handler
    const deleteUserHandler = () => {
        mutation.mutate(id);
        console.log(id);
    }

    return (
        <div className="w-full h-13  bg-white hover:bg-zinc-100 py-2 flex justify-center rounded-xl mt-2 ">
            <div className="w-full h-full flex justify-between items-center gap-3 my-1">
                {/* <h1 className={`text-white bg-[#056A68] py-2 px-2.5 ml-1 rounded-md`}>{table}</h1> */}
                <div className="w-full h-full flex justify-between items-center ml-5">
                    <div className="w-full h-full flex flex-col justify-center gap-">
                        <h1 className="text-sm font-bold">{name}</h1>
                        <p className="text-[10.5px] font-p text-zinc-500">{role}</p>
                    </div>
                    {userData._id === id ? null :
                        <div className="w-full h-full ml-4 flex flex-col items-center justify-center ">
                            <MdOutlineDeleteOutline onClick={deleteUserHandler} className="text-red-700 text-2xl hover:text-red-900" />
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default UserCard

