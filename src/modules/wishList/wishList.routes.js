import { protectedRoute } from "../../utils/middleware/protected.routes.js";
import { addWish, deleteWish, getWishList } from "./wishList.controller.js";

import { Router } from "express";

let wishListRouter = Router();

wishListRouter.get("/", protectedRoute, getWishList);

wishListRouter.post("/:product", protectedRoute, addWish);

wishListRouter.delete("/:product", protectedRoute, deleteWish);

export default wishListRouter;
