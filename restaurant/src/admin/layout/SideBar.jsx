import { useState } from "react";
import Admin_menuCard from "../components_admin/Admin_menuCard"
import { BiLogOut } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query"
import { logout } from "../../api/index";
import { useDispatch ,useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const SideBar = (props) => {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // eslint-disable-next-line react/prop-types
    const { Change } = props
    const [selected, setSelected] = useState(0);

    // logout function
    const logoutHandler = () => {
        logoutMutation.mutate();
    }

    //api coll's
    const logoutMutation = useMutation({
        mutationFn: async () => await logout(),
        onSuccess: (data) => {
            dispatch(removeUser());
            navigate("/login");
            enqueueSnackbar(data?.message || "Logged out", { variant: "success" });
        },
        onError: (err) => {
            console.log(err.message);
            enqueueSnackbar(err.message, { variant: "error" });
        }
    });

    // menu list
    const menuLest = [
        {
            title: "Dashboard",
        },
        {
            title: "Menu",
        },
        {
            title: "Order",
        },
        {
            title: "Create & Edit",
        },
        {
            title: "Settings",
        }
    ];

    return (
        <>
            <div className="row-span-full row-start-1 bg-white  relative ">
                {/* logo and headline */}
                <div className="py-5 flex justify-start items-center">
                    <img className="h-25" src="../src/assets/images/Logo.png"
                        alt="Logo"
                    />
                    <h1 className="font-h1_sc text-xl font-medium">Master Chef</h1>
                </div>
                {/* all menu*/}

                <div className="flex flex-col justify-start items-center w-full h-fit px-2 gap-3">
                    {menuLest.map((item, index) => (
                        <Admin_menuCard
                            key={index}
                            title={item.title}
                            selected={selected === index}
                            onClick={() => {
                                setSelected(index)
                                Change(index)
                            }}
                        />
                    ))}
                </div>
                {/* logout */}
                <div className=" h-30  w-full absolute bottom-0 left-0 px-3 flex flex-col ">
                    <h2 className="font-bold text-center">{userData.username || "user name"}</h2>
                    <p className="text-[13px] text-zinc-400 font-p text-center">{userData.role || "status"}</p>
                    <div onClick={logoutHandler} className="mt-5 flex gap-1 items-center  text-[15px] justify-center hover:bg-red-700 text-red-600 hover:text-white py-1 rounded-md cursor-pointer">
                        <BiLogOut className="font-bold" />
                        <p className="font-h1_sc font-bold">LogOut</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
