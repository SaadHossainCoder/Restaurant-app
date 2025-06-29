import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        foodItem: {
            type: String,
            required: true,
            trim: true,
        },
        tableNo: {
            type: String,
            required: true,
            trim: true,
        },
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        customerPhone: {
            type: Number,
            required: true,
            match: [/^\d{10}$/, "Please enter a valid phone number"],
            trim: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        // paymentCode: {
        //     type: String,
        //     required: true,
        //     trim: true,
        // },
        // payment: {
        //     type : Schema.Types.ObjectId,
        //     ref:"payment"
        // },
        items: [],
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
