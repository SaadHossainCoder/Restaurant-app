import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            min: 0,
        },
        rating: {
            type: Number,
            required: true,
            trim: true,
            default: 0,
            min: 0,
            max: 5,
        },
        time:{
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        foodType: {
            type: String,
            enum: ["vegetarian", "non-vegetarian"],
            required: true,
            lowercase: true,
            trim: true,
        },
        // ingredients: {
        //     type: String,
        //     required: true,
        //     trim: true,
        // },
    },
    { timestamps: true }
);


export const Product = mongoose.model("product", productSchema);