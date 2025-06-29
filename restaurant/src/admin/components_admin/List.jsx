import { BiCheckDouble } from "react-icons/bi"
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";

const List = (props) => {
    // eslint-disable-next-line react/prop-types
    const { name, items, table, stage, status} = props;
    return (
        <div className="w-full h-15  bg-white hover:bg-zinc-100 py-2 rounded-xl ">
            <div className="w-full h-full flex justify-between items-center gap-3 my-1">
                <h1 className={`text-white bg-[#056A68] py-2 px-2.5 ml-1 rounded-md`}>{table}</h1>
                <div className="w-full h-full flex justify-between items-center">
                    <div className="w-full h-full flex flex-col justify-center gap-1">
                        <h1 className="text-sm font-bold">{name}</h1>
                        <p className="text-[10.5px] font-p text-zinc-500">{items} item</p>
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-center pr-1 ">
                        {stage === "oder" ? (<>
                            {status === "ready" ? <><div className="flex items-center justify-center mr-1 bg-[#C9FFE6] rounded-md px-1 py-0.5 gap-1 ">
                            <BiCheckDouble className="font-black" />
                            <p className="text-[10px] pr-1 font-black "> Ready </p>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-bold flex items-center justify-center gap-0.5 font-sans mt-1">
                            <samp className="text-[14px] text-green-600 bg-green-600 h-1.5 w-1.5 rounded-full "></samp>
                        Ready to serve
                        </p>
                    </> : null }
                            {status === "progress" ? <><div className="flex items-center justify-center mr-1 bg-[#FCF0B9] rounded-md px-1 py-0.5 gap-1 ">
                            <MdOutlineTimer className="font-black" />
                            <p className="text-[10px] pr-1 font-black ">In Progress </p>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-bold flex items-center justify-center gap-0.5 font-sans mt-1">
                            <samp className="text-[14px] bg-amber-200 h-1.5 w-1.5 rounded-full "></samp>
                        In the Kitchen
                        </p>
                    </> : null }
                            {status === "completed" ? <><div className="flex items-center justify-center mr-1 bg-[#E2EBFB] rounded-md px-1 py-0.5 gap-1 ">
                            <LuBadgeCheck className="font-black" />
                            <p className="text-[10px] pr-1 font-black "> Completed </p>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-bold flex items-center justify-center gap-0.5 font-sans mt-1 ">
                            <samp className="text-[14px] bg-blue-500 h-1.5 w-1.5 rounded-full "></samp>
                        Waiting For Payment 
                        </p>
                    </> : null }

                        </>) : null  }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
