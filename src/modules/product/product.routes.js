import { Router } from "express";
import * as productController from "./product.controller.js";
import { mixedUploads } from "../../utils/multer/multerUpload.js";
import { validation } from "../../utils/middleware/validator.js";
import { addSchema, deleteSchema, updateSchema } from "./product.validation.js";
import {
  allowTo,
  protectedRoute,
} from "../../utils/middleware/protected.routes.js";

let ProductRouter = Router();

ProductRouter.route("/")
  .get(productController.getAllProducts)
  .post(
    protectedRoute,
    allowTo("admin", "seller"),
    mixedUploads([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]),
    validation(addSchema),
    productController.addProduct
  );

ProductRouter.route("/:id")
  .get(productController.getOneProduct)
  .delete(
    protectedRoute,
    allowTo("admin"),
    validation(deleteSchema),
    productController.deleteProduct
  )
  .put(
    protectedRoute,
    allowTo("admin"),
    mixedUploads([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 4 },
    ]),
    validation(updateSchema),
    productController.updateProduct
  );

export default ProductRouter;
