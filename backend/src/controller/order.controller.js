import { asyncHandler } from '../utils/asyncHandler.js';
import { Order } from '../models/order.model.js';
import { ApiError } from '../error/ApiError.js';
import mongoose from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse.js';

const createOrder = asyncHandler(async (req, res) => {
    const { status,stage, date, time, foodItem, tableNo, customerName, customerPhone, paymentMethod, paymentAmount, paymentCode, items, } = req.body;

    if (
        [status, stage, date, time, foodItem, tableNo, customerName, customerPhone, paymentMethod, paymentAmount, paymentCode ,items].some(field => field === undefined || field === null)
    ) {
        throw new ApiError(400, "All fields are required");
    }



    // Save the order to the database
    const order = new Order(req.body);
    await order.save();

    // Check if the order was created successfully
    if (!order) {
        throw new ApiError(500, "Failed to create order");
    }

    // Send a success response
    return res.status(201).json(
        new ApiResponse(201, order, "User registered Successfully")
    )
});

const getAllOrders = asyncHandler(async (req, res) => {
    // Fetch all orders from the database
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
        throw new ApiError(404, "No orders found");
    }
    
    return res.status(200)
        .json(
            {
                orders
            }
        );

});


const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid order ID");
    }

    // Fetch the order by ID from the database
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    // Send a success response
    return res.status(200)
        .json(
            {
                order
            }
        );
});

const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid order ID");
    }

    // Validate the request body
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "No data provided for update")
        );
    }

    const {
        status,
        stage,
        date,
        time,
        foodItem,
        tableNo,
        customerName,
        customerPhone,
        paymentMethod,
        paymentAmount,
        paymentCode,
        items

    } = req.body;

    // Build update object
    const updateData = {
        ...(status && { status }),
        ...(date && { date }),
        ...(time && { time }),
        ...(foodItem && { foodItem }),
        ...(tableNo && { tableNo }),
        ...(customerName && { customerName }),
        ...(customerPhone && { customerPhone }),
        ...(paymentMethod && { paymentMethod }),
        ...(paymentAmount && { paymentAmount }),
        ...(paymentCode && { paymentCode })
    };

    // Fetch and update the order in one step
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    // Check if the order exists
    if (!updatedOrder) {
        throw new ApiError(404, "Order not found");
    }

    // Send a success response
    return res.status(200).json(
        new ApiResponse(200, updatedOrder, "Order updated successfully")
    );
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid order ID");
    }

    // Fetch the order by ID from the database 
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    
    // Delete the order from the database
    await Order.findByIdAndDelete(id);

    // Send a success response
    return res.status(201).json(
        new ApiResponse(201, order, "Order deleted successfully"))
});

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};