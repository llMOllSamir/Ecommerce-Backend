import { Router } from "express";
import * as subCategoryController from "./controller/subCategory.controller.js";
import { singleUpload } from "./../../utils/multer/multerUpload.js";
import { validation } from "../../utils/middleware/validator.js";
import { addSchema } from "./controller/validator.js";

let subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .get(subCategoryController.getAllSubCategories)
  .post(
    singleUpload("image"),
    validation(addSchema),
    subCategoryController.addSubCategory
  );

subCategoryRouter
  .route("/:id")
  .put(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory)
  .get(subCategoryController.specificSubCategories);

export default subCategoryRouter;
