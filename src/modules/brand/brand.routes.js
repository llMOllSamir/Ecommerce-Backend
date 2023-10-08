import { Router } from "express";
import * as brandController from "./controller/brand.controller.js";
import { singleUpload } from "../../utils/multer/multerUpload.js";
import { validation } from "../../utils/middleware/validator.js";
import {
  addSchema,
  deleteSchema,
  updateSchema,
} from "./controller/validator.js";
import {
  allowTo,
  protectedRoute,
} from "../../utils/middleware/protected.routes.js";

let brandRouter = Router();

brandRouter
  .route("/")
  .get(brandController.getAllBrands)
  .post(
    protectedRoute,
    allowTo("admin", "seller"),
    singleUpload("logo"),
    validation(addSchema),
    brandController.addBrand
  );

brandRouter
  .route("/:id")
  .put(
    protectedRoute,
    allowTo("admin"),
    singleUpload("logo"),
    validation(updateSchema),
    brandController.updateBrand
  )
  .delete(
    protectedRoute,
    allowTo("admin"),
    validation(deleteSchema),
    brandController.deleteBrand
  )
  .get(brandController.specificCategories);

export default brandRouter;
