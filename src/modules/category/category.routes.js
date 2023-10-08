import { Router } from "express";
import * as CategoryController from "./controller/category.controller.js";
import { validation } from "./../../utils/middleware/validator.js";
import {
  addSchema,
  deleteSchema,
  updateSchema,
} from "./controller/validation.js";
import { singleUpload } from "../../utils/multer/multerUpload.js";
import { getAllSubCategories } from "../subCategory/controller/subCategory.controller.js";
import { allowTo, protectedRoute } from "../../utils/middleware/protected.routes.js";

let categoryRouter = Router();

categoryRouter
  .route("/")
  .get(CategoryController.getAllCategories)
  .post(
    protectedRoute,
    allowTo("admin", "seller"),
    singleUpload("image"),
    validation(addSchema),
    CategoryController.addCategory
  );

categoryRouter
  .route("/:id")
  .put(
    protectedRoute,
    allowTo("admin"),
    singleUpload("image"),
    validation(updateSchema),
    CategoryController.updateCategory
  )
  .delete(
    protectedRoute,
    allowTo("admin"),
    validation(deleteSchema),
    CategoryController.deleteCategory
  )
  .get(CategoryController.specificCategories);

categoryRouter.get("/:id/subCategories", getAllSubCategories);
export default categoryRouter;
