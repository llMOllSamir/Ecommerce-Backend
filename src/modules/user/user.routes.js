import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import { validation } from "../../utils/middleware/validator.js";
import {
  addSchema,
  changePasswordSchema,
  idSchema,
} from "./controller/user.validation.js";
import { singleUpload } from "../../utils/multer/multerUpload.js";
import {
  allowTo,
  protectedRoute,
} from "../../utils/middleware/protected.routes.js";

let userRouter = Router();

userRouter
  .route("/")
  .get(protectedRoute, allowTo("admin"), userController.getAllUsers)
  .post(
    protectedRoute,
    allowTo("admin"),
    validation(addSchema),
    userController.addUser
  )

userRouter
  .route("/:id")
  .get(userController.getOneUser)
  .delete(
    protectedRoute,
    allowTo("admin"),
    validation(idSchema),
    userController.deleteUser
  )
  .put(
    protectedRoute,
    allowTo("admin"),
    validation(idSchema),
    userController.updateUser
  )
  .patch(protectedRoute, allowTo("admin"),userController.blockUser);

userRouter.patch(
  "/changePassword",
  protectedRoute,
  allowTo("admin"),
  validation(changePasswordSchema),
  userController.changePassword
);

userRouter.post("/image",protectedRoute,  singleUpload("image"),userController.imageUpload)

export default userRouter;
