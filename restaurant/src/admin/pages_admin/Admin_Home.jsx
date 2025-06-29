import { useState } from "react";
//react-components
import Dashboard from "../layout/Dashboard";
import Order from "../layout/Order";
import SideBar from "../layout/SideBar";
import Menu from "../layout/Menu";

const Admin_Home = () => {
    const [Change, setChange] = useState(0);
    return (
        <div className="w-screen h-screen  flex justify-center items-center bg-[#e3e3e3]">
            <div className="grid grid-cols-5 grid-rows-10 gap-3 w-screen h-screen pr-3">
                {/* menu left side bar */}
                <SideBar
                    Change={setChange}
                />
                {Change === 0 ?
                    <Dashboard />
                    : Change === 1 ?
                        <Menu />
                        : Change === 2 ?
                            <Order />
                            : null
                }
            </div>
        </div>
    )
}

export default Admin_Home
