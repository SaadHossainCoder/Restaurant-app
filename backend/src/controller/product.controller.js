import {asyncHandler} from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../error/ApiError.js";
import mongoose from "mongoose";


const createProduct = asyncHandler(async (req, res) => {
    const { image, name, description, price, rating, time, category, foodType } = req.body;
    if (
        !(image && name && description && price && rating && time && category && foodType )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const product = new Product(req.body);
    await product.save();

    if (!product) {
        throw new ApiError(500, "Failed to create product");
    }

    return res.status(201).json(
        new ApiResponse(201, product, "Product created successfully")
    );
});

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return res.json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("getAllProducts error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200)
        .json(
            {
                product
            }
        );
});

const updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "No data provided for update")
        );
    }

    const {
        image,
        name,
        description,
        price,
        rating,
        time,
        category,
        foodType,
    } = req.body;

    const updateData = {
        ...(image && { image }),
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
        ...(rating && { rating }),
        ...(time && { time }),
        ...(category && { category }),
        ...(foodType && { foodType }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(201).json(
        new ApiResponse(201, updatedProduct, "Product updated successfully")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id);

    await Product.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, product, "Product deleted successfully")
    );
});

export {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
