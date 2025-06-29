
const Heder = () => {
    // time & date 
    const todayDate = new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <>
            <div className="col-span-full col-start-2  ">
                <div className=" w-full h-full flex justify-between items-center">
                    <h1 className="mx-4 text-xl font-medium font-p ">Nice! We have a lot of orders 😀 </h1>
                    <p className="pr-3">{new Date().toLocaleDateString("en-US", { weekday: "long" })}, {todayDate}</p>
                </div>
            </div>
        </>
    )
}

export default Heder
