import { Schema } from "mongoose"
import { required } from "zod/mini";

// models/category.model.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Category = mongoose.model("Category", categorySchema);
