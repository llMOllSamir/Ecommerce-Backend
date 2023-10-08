import * as refactor from "../../../utils/Handler/reFactor.handler.js";
 import categoryModel from "./../../../../DB/models/category.model.js";

/** Get all Categories  */
let getAllCategories = refactor.find(categoryModel);
/** Add Categories  */
let addCategory = refactor.addOne(categoryModel, "Category");

/** UpdateCategories  */
let updateCategory = refactor.updateOne(categoryModel, "Category");

/** Delete Categories  */
let deleteCategory = refactor.deleteOne(categoryModel, "Category");

/** specific  Categories  */
let specificCategories = refactor.findOne(categoryModel)

export { getAllCategories, addCategory, updateCategory, deleteCategory,specificCategories };
