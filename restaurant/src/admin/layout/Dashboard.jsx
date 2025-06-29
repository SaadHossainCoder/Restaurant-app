import { BiSearch } from "react-icons/bi"
import Time from "../components_admin/Time"
import List from "../components_admin/List"
import { LuAlarmClock, LuConciergeBell } from "react-icons/lu";
import Heder from "../components_admin/heder";
import UserCard from "../../components/ui/UserCard";
import { allUsers } from "../../api/index";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useState } from "react";
import RegisterPage from "../components_admin/registerPage";


const Dashboard = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { role } = useSelector((state) => state.user);
    //api data
    const { data, isError } = useQuery(
        {
            queryKey: ["allUsers"],
            queryFn: async () => await allUsers() ,
            placeholderData: keepPreviousData,
        }
    );
    if (isError) {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
    
    const registerHandler = () => {
        setIsChecked(true);
    }

    // order list
    const userLest = [
        {
            name: "saad",
            items: "5",
            table: "A4",
            stage: "oder",
            status: "ready",
        },
        {
            name: "sri",
            items: "4",
            table: "B3",
            stage: "oder",
            status: "progress",
        },
        {
            name: "hi..",
            items: "5",
            table: "A1",
            stage: "oder",
            status: "completed",
        },


    ];

    return (
        <>
        {isChecked === true && <RegisterPage onClose={() => setIsChecked(false)} />}
            {/* header */}
            <Heder />
    {/*TODO : add count down new orders*/}
            {/* new orders */}
            <div className="row-span-2 row-start-2  ">
                <div className="w-full h-full text-white bg-[#056A68] px-4 py-3 rounded-xl">
                    <div className=" w-full flex items-center justify-between">
                        <h1 className="">New Order</h1>
                        <LuConciergeBell className=" bg-white text-[#056A68] font-bold text-4xl rounded-md p-1 mr-2" />
                    </div>
                    <div className="w-full mt-2">
                        <h1 className="text-5xl mb-2">16</h1>
                        <p className="text-[12px] text-gray-300">• Updated every new orders</p>
                    </div>
                </div>
            </div>
    {/* TODO : add count down new waiting  */}
            {/* orders in waiting */}
            <div className="col-start-3 row-start-2 row-span-2">
                <div className="w-full h-full  bg-white px-4 py-3 rounded-xl">
                    <div className=" w-full flex items-center justify-between">
                        <h1 className="">Waiting List</h1>
                        <LuAlarmClock className=" bg-[#FEF2CB] text-orange-700 font-bold text-4xl rounded-md p-1 mr-2" />
                    </div>
                    <div className="w-full mt-2">
                        <h1 className="text-5xl mb-2">09</h1>
                        <p className="text-[12px] text-zinc-500">
                            • Updated every new orders</p>
                    </div>
                </div>
            </div>

            {/* total orders */}
            <div className="col-start-4 row-start-2 row-span-2 ">
                <div className="w-full h-full bg-white px-4 py-3 rounded-xl">
                    <div className=" w-full flex items-center justify-between">
                        <h1 className="">New Order</h1>
                        <LuConciergeBell className=" bg-white text-emerald-700 font-bold text-4xl rounded-md p-1 mr-2" />
                    </div>
                    <div className="w-full mt-2">
                        <h1 className="text-5xl mb-2">16</h1>
                        <p className="text-[12px] text-zinc-500">• Updated every new orders</p>
                    </div>
                </div>
            </div>
    {/* TODO : add orders list */}
            {/* orders list */}
            <div className="row-span-full col-start-2 row-start-4">
                <div className="bg-white w-full h-full rounded-xl px-3 py-4">
                    <h1 className="text-xl">Order List</h1>
                    <form action="" className="flex w-full items-center justify-center mt-3">
                        <input type="text" placeholder="search a order..." className=" text-sm w-full bg-zinc-100 p-2 rounded-l-md outline-0" />

                        <BiSearch type="search" className="text-center text-4xl bg-zinc-100 p-2 rounded-r-md" />
                    </form>
                    <div className="w-full h-100 bg-amber-30 flex flex-col mt-5 items-center  overflow-y-scroll hide-scroll-bar">

                        {userLest.map((item, index) =>
                            <List
                                key={index}
                                id={index}
                                name={item.name}
                                items={item.items}
                                table={item.table}
                                stage={item.stage}
                                status={item.status}
                            />)}
                    </div>
                </div>
            </div>
    {/* TODO : add payments list */}
            {/* payments list */}
            <div className="row-span-full col-start-3 row-start-4 ">
                <div className="bg-white w-full h-full rounded-xl px-3 py-4">
                    <h1 className="text-xl">Payment</h1>
                    <form action="" className="flex w-full items-center justify-center mt-3">
                        <input type="text" placeholder="search a order..." className=" text-sm w-full bg-zinc-100 p-2 rounded-l-md outline-0" />

                        <BiSearch type="search" className="text-center text-4xl bg-zinc-100 p-2 rounded-r-md" />
                    </form>
                    <div className="w-full h-108 mt-2 bg-amber-500 overflow-y-scroll hide-scroll-bar">
                        {/* list  */}
                    </div>
                </div>
            </div>

            {/* Dishes list */}
            <div className="row-span-full col-start-4 row-start-4">
                <div className="bg-white w-full h-full rounded-xl px-3 py-4">
                    <h1 className="text-xl">Dishes</h1>
                    <form action="" className="flex w-full items-center justify-center mt-3">
                        <input type="text" placeholder="search a order..." className=" text-sm w-full bg-zinc-100 p-2 rounded-l-md outline-0" />

                        <BiSearch type="search" className="text-center text-4xl bg-zinc-100 p-2 rounded-r-md" />
                    </form>
                    <div className="">
                        {/* list  */}
                    </div>
                </div>
            </div>

            <div className="row-span-4 col-start-5 row-start-3 overflow-hidden ">
                {role === "admin" && <div className="bg-white w-full h-full rounded-xl px-3 py-4">
                    <h1 className="text-xl m-0.5 mb-3">User</h1>
                    <button onClick={() => registerHandler()} className="flex justify-center w-full bg-[#C3540B] text-white p-2 rounded-md hover:bg-[#c3550bd2]">Create User</button>
                    <div className="w-full h-50 overflow-y-scroll hide-scroll-bar mt-1">
                        {data?.data?.users?.map((item) =>
                            <UserCard
                                id={item._id}
                                key={item._id}
                                name={item.username}
                                email={item.email}
                                phone={item.phone}
                                role={item.role}
                            />)}
                    </div>
                </div>
                }:{
                    <div className="bg-white w-full h-full rounded-xl px-3 py-4 flex justify-center items-center">
                        <h1 className="text-xl text-red-700 font-bold text-center">
                            only admin can access this page
                        </h1>
                    </div>
                }
            </div>


            <div className="row-span-4 col-start-5 row-start-7 bg-amber-800">10</div>

            {/* time  */}
            <div className="row-span-1 col-start-5 row-start-2 flex justify-center items-center h-full w-full">
                <Time />
            </div>

        </>
    )
}

export default Dashboard
