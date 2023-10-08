import { Router } from "express";
import * as auth from "./controller/auth.controller.js";
import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import { validation } from "./../../utils/middleware/validator.js";
import * as valid from "./controller/auth.validation.js";
import { singleUpload } from "../../utils/multer/multerUpload.js";
// routes decelerate
let authRouter = Router();

authRouter
  .post("/signIn", validation(valid.signIn), auth.signIn)
  .post("/signUp",singleUpload("image"), validation(valid.signUp), auth.signUp)
  .get("/confirmEmail/:token", auth.confirmEmail)
  .patch("/forgotPassword", validation(valid.email), auth.forgotPassword)
  .patch("/resetPassword", validation(valid.reset), auth.resetPassword)
  .patch(
    "/updatePassword",
    protectedRoute,
    validation(valid.updatePassword),
    auth.updatePassword
  )
  .put(
    "/updateData",
    protectedRoute,
    validation(valid.updateData),
    auth.updateData
  );

export default authRouter;
