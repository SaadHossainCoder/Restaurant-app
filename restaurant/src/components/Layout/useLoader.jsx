import { useState } from "react";


const useLoader = () => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    const LoaderComponent = () =>
        loading ? (
            <div className="fixed inset-0  bg-[#00000074] bg-opacity-10 backdrop-blur-md p-10 rounded-xl flex justify-center items-center z-50">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-15 h-15 border-8 text-[#5C2708]  text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#5C2708] rounded-full">
                    </div>
                </div>
            </div>
        ) : null;

    return { showLoader, hideLoader, Loader: LoaderComponent };
};




export default useLoader

