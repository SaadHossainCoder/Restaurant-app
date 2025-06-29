import { asyncHandler } from '../utils/asyncHandler.js';
import { Error } from '../models/error.model.js';
import { ApiError } from '../error/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createError = asyncHandler(async (req, res, next) => {
    const error = new Error(req.body);
    await error.save();


    if (!error) {
        throw new ApiError(400, "Error creation failed");
    }

    return res.status(201)
        .json(
            new ApiResponse(201, error, "Error created successfully")
        );
});

const getErrors = asyncHandler(async (req, res, next) => {
    const errors = await Error.find();

    if (!errors || errors.length === 0) {
        throw new ApiError(404, "No orders found");
    }

    return res.status(200)
        .json(
            {
                status: 200,
                success: true,
                message: 'Errors fetched successfully',
                errors,
            }
        );
});

const deleteError = asyncHandler(async (req, res, next) => {
        const error = await Error.findByIdAndDelete(req.params.id);

        if (!error) {
            throw new ApiError(404, "Error not found");
        }

        return res.status(200)
            .json(
                {
                    status: 200,
                    success: true,
                    message: 'Error deleted successfully',
                }
            );
    }
);



export {
    createError,
    getErrors,
    deleteError
}