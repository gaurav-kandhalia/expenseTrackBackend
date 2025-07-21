
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Category } from "../../models/category.model.js"
import {categorySchema} from '../../Validations/category.validation.js'

export const createCategory = asyncHandler(async (req, res) => {
  console.log("................this is createCategory................");

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
