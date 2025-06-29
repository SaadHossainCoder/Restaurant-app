import { useEffect, useState } from "react";
const Time = () => {
    // time
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // Updates every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // const time24Hour = new Date().toLocaleTimeString("en-IN", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     second: "2-digit",
    //     hour12: true,
    // });

    return (
            <div className="w-full h-full rounded-xl px-3 py-4 text-white bg-[#C3540B] flex justify-center items-center gap-1">
                <p className="text-3xl ">{time.toLocaleTimeString()}</p>
            </div>
    )
}

export default Time
