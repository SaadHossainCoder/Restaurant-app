//react-icons
import {BiSolidDashboard,BiFoodMenu ,BiEdit } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
const Admin_menuCard = (props) => {
    // eslint-disable-next-line react/prop-types
    const { title, selected, onClick } = props
    return (
    
        <div className={` h-13 w-full pl-6 hover:bg-[#C3540B] rounded-md flex justify-start items-center gap-3 hover:text-white cursor-pointer ${selected ? "bg-[#C3540B] text-white" : "bg-white"}`} onClick={onClick}
        >
            {title === "Dashboard" ? <BiSolidDashboard className="text-[20px] " /> : ""}
            {title === "Menu" ? <BiFoodMenu className="text-[20px] " /> : ""}
            {title === "Order" ? <LiaFileInvoiceDollarSolid className="text-[20px] " /> : ""}
            {title === "Create & Edit" ? <BiEdit className="text-[20px] " /> : ""}
            {title === "Settings" ? <IoSettingsOutline  className="text-[20px] " /> : ""}
            
            <h2 className="font-p text-[14px] ">{title}</h2>
        </div>
    )
}

export default Admin_menuCard
