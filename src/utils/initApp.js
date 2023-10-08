import AppError from "./services/appError.js";
import categoryRouter from "../modules/category/category.routes.js";
import handelGlobalError from "./middleware/handelGlobalError.js";
import subCategoryRouter from "../modules/subCategory/subCategory.routes.js";
import brandRouter from "../modules/brand/brand.routes.js";
import ProductRouter from "../modules/product/product.routes.js";
import userRouter from "../modules/user/user.routes.js";
import authRouter from "../modules/auth/auth.routes.js";
import reviewsRouter from "../modules/reviews/reviews.routes.js";
import wishListRouter from "../modules/wishList/wishList.routes.js";
import address from "../modules/address/address.routes.js";
import couponRouter from "../modules/coupon/coupon.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRouter from "../modules/order/order.routes.js";

let initApp = (app) => {
  /*=============
      Routes
  ==============*/

  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", ProductRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewsRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/address", address);
  app.use("/api/v1/coupon", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);

  // wrong api
  app.use("*", (req, res, next) => {
    next(new AppError(`URL ${req.originalUrl} is Not exist`, 404));
  });

  // Global error handler
  app.use(handelGlobalError);
};

export default initApp;
