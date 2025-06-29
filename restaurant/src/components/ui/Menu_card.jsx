/* eslint-disable react/prop-types */

const Menu_card = (props) => {
    const{title , image , selected, onClick} = props;
    return (
        <div >
            <div className="inline-block px-1 cursor-pointer">
                <div className={`w-20 h-20 md:w-64 mb:h-64 max-w-xs overflow-hidden rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col md:flex-none justify-center items-center gap-1 p-1 active:bg-[] ${selected ? "bg-[#c3540b] text-white" : "bg-white"}`} onClick={onClick} >
                    <img className=" md:w-9 w-8" src={image} alt="img" />
                    <p className=" md:text-sm text-[13px] text-center font-bold  ">{title}</p>
                </div>
            </div>
        </div>
    )
}

export default Menu_card