import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../error/ApiError.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, phone, password, role } = req.body;
    if (
        !(username || email || phone || password || role)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    const user = new User(req.body);
    await user.save();

    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, user, "User registered Successfully")
    )
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate access token
    const accessToken = user.generateAccessToken();

    // Prepare user data excluding password
    const loggedInUser = await User.findById(user._id).select("-password");

    // Cookie options
    const options = {
        httpOnly: true,
        secure: true,
    };

    // Send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // Optional: Try removing token from DB if available
    if (req.user?._id) {
        await User.findByIdAndUpdate(req.user._id, {
            $unset: { accessToken: 1 }
        });
    }

    const options = {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found");
    }
    
    // if (req.user.role !== "admin") {
    //     throw new ApiError(403, "Only admins can delete users");
    // }

    return res.status(200)
        .json(
            {
                users
            }
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admins can delete users");
    }

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid user ID");
    }

    // Check if user exists before deleting
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
        throw new ApiError(404, "User not found");
    }

    // Case 1: If the user is deleting their own account, delete and log them out
    if (req.user._id.toString() === id.toString()) {
        await User.findByIdAndDelete(id);

        // Clear access token and cookie
        const options = {
            httpOnly: true,
            // secure: true,
            expires: new Date(0), // expires immediately
        };

        return res
            .status(200)
            .cookie("accessToken", "", options)
            .json(new ApiResponse(200, {}, "Your account was deleted and you have been logged out"));
    }

    // Case 2: If admin or someone else deletes a user (not themselves)
    await User.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, userToDelete, "User deleted successfully"));
});




export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    getAllUsers,
    deleteUser
};

