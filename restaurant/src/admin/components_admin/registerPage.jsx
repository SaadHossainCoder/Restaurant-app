//icon 
import { useMutation } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx";
import { register } from "../../api";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const RegisterPage = (props) => {
    // eslint-disable-next-line react/prop-types
    const { onClose } = props;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    })
    
    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value,
            }
        )
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            role: ""
        })
        registerMutation.mutate(formData)
        onClose()
    }

    const registerMutation = useMutation({
        mutationFn: async (data) => await register(data),
        onSuccess: (data) => {
            console.log(data)
            enqueueSnackbar(data.message, { variant: "success" })
            onClose()
        }
        ,
        onError: (err) => {
            enqueueSnackbar(err.response.data.message, { variant: "error" })
            console.error(err)
            onClose()
        }

    })

    return (
        <div className="fixed inset-0 bg-[#00000098]  p-10  flex justify-center items-center z-50" >
            <div className="w-400 ">
                <form onSubmit={submitHandler}>
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                                <div className="flex items-center justify-between"><p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Create an account
                                </p>
                                    <RxCross2 className="text-3xl hover:bg-zinc-100 rounded-full p-1 cursor-pointer" onClick={onClose} />
                                </div>
                                <div className="flex flex-col gap-3 h-100 overflow-y-scroll hide-scroll-bar ">
                                    {/* name input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Your username
                                        </label>
                                        <input placeholder="Enter your username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0" id="username" type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required

                                        />
                                    </div>
                                    {/* email input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Email
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0" placeholder="Enter your email" id="email" type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Email must be a valid email address."

                                        />
                                    </div>
                                    {/* phone input */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Phone number
                                        </label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0" placeholder="Enter your Phone number" id="phone" type="number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            pattern="^\+?[1-9]\d{1,14}$"
                                            title="Phone number must be a valid international format, e.g., +1234567890."

                                        />
                                    </div>
                                    {/* password input */}
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-0"
                                        placeholder="••••••••"
                                        id="Password"
                                        // type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                                        title="Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number."
                                    />

                                    <div className="px-0.5">
                                        <p className="block mb-2 text-sm font-medium text-gray-900">
                                            Role
                                        </p>
                                        <select
                                            name="role"
                                            className="text-md flex-1 px-1 py-1.5 ring-1 ring-gray-400 rounded-md outline-none w-full cursor-pointer"
                                            id="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required

                                        >
                                            <option value="">Select role</option>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="chef">chef</option>
                                            <option value="Developer">Developer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-5">
                                    <button
                                        className="w-full bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white cursor-pointer"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    <button className="w-full border-2 border-zinc-400 hover:bg-zinc-400 text-zinc-400  rounded-lg text-sm px-5 py-2.5  text-center  hover:text-white outline-0 cursor-pointer" onClick={onClose}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
