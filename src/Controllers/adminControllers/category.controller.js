
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Category } from "../../models/category.model.js"
import {categorySchema} from '../../Validations/category.validation.js'

export const createCategory = asyncHandler(async (req, res) => {
  

  const validatedData = categorySchema.parse(req.body);
  const createdBy = req.user._id;

  const existingCategory = await Category.findOne({ name: validatedData.name });
  if (existingCategory) {
    throw new ApiError(401, "Category already exists");
  }

  const category = await Category.create({ name: validatedData.name,createdBy:createdBy});

  if (!category) {
    throw new ApiError(404, "Something went wrong", false);
  }

  res.status(201).json(
    new ApiResponse(201, category, "Category created successfully", true)
  );
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 }); 

  if (!categories || categories.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No categories found", false));
  }

  res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully", true));
});
