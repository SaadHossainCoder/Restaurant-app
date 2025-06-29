import mongoose , {Schema} from "mongoose";

const errorSchema = {
    errorCode :{
        type: Number,
        required: true,
    },
    errorMessage: {
        type: String,
        required: true,
    },
    errorData:{
        type: String,
        required: true,
    }
};

export const Error = mongoose.model("Error", errorSchema);