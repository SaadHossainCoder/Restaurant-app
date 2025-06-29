import { useState } from "react";
import useLoader from "../../components/Layout/useLoader";
import { login } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //loader
    const { showLoader, hideLoader, Loader } = useLoader();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    // const [isForgotPassword, setIsForgotPassword] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showLoader();
        setFormData({
            email: "",
            password: "",
        });
        loginMutation.mutate(formData);
    };

    // api coll's
    const loginMutation = useMutation({
        mutationFn: async (reqData) => await login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            const { _id, username, email, phone, role } = data.data.user
            dispatch(setUser({ _id, username, email, phone, role }));
            navigate("/dashboard");
            enqueueSnackbar(data.message, { variant: "success" })
            hideLoader();
        },
        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
            hideLoader();
        }
    })

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.pinimg.com/736x/97/79/cf/9779cf30f1054795685c0b9c8ae00013.jpg')",
            }}
        >
            <Loader />
            <div className=" bg-[#ffffff23] bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-lg w-96 text-white relative">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Login form */}

                    <div className="flex items-center bg-[#ffffff23] rounded-md px-4 py-2">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Username"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Email must be a valid email address."
                            className="bg-transparent outline-none w-full text-white placeholder-white"
                        />
                    </div>
                    <div className="flex items-center bg-[#ffffff23]  rounded-md px-4 py-2">
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            type="password"
                            placeholder="Password"
                            required
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                            title="Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number."
                            className="bg-transparent outline-none w-full text-white placeholder-white"
                        />
                    </div>
                    <div className="flex justify-end items-center text-sm">
                        {/* <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-purple-500" />
                                    Remember me
                                </label> */}
                        <button
                            type="button"
                            className="underline"
                        // onClick={() => setIsForgotPassword(true)}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button
                        className="w-full py-2 mt-4 bg-white text-[#5C2708] font-semibold rounded-full hover:bg-[#fff4ed]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
