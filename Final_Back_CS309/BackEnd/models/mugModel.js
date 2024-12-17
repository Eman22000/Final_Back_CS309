import mongoose from "mongoose";

const mugSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
            unique: [true, 'Name must be unique'],
            minlength: [3, "Too short name"],
            maxlength: [32, "Too long name"],
        },
        // Converts spaces in names to slashes (e.g., 'a and b' --> 'a-and-b')
        slug: {
            type: String,
            lowercase: true, // Correct spelling for lowercasing strings
        },
        description: {
            type: String,
            required: [true, 'Description required'],
            minlength: [50, "Too short description"],
            maxlength: [250, "Too long description"],
        },
        price: {
            type: Number,
            required: [true, 'Price required'],
        },
        image: {
            type: String,
            required: [true, 'Image required'], // Updated error message
        },
        category: {
            type: String,
            required: [true, 'Category required'],
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

// Ensure the model is only created once
const mugModel = mongoose.models.mug || mongoose.model("mug", mugSchema);

export default mugModel;
