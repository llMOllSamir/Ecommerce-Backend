import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";
import productModel from "../../../../DB/models/product.model.js";
import cartModel from "../../../../DB/models/cart.model.js";
import AppError from "../../../utils/services/appError.js";

/*===================
 *  Handler Method  
 ====================*/

function calcPrice(cart) {
  let total = 0;
  cart.cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  cart.totalPrice = total;
}

function calcDiscount(cart) {
  if (cart.discount > 0) {
    let discount = (cart.totalPrice * cart.discount) / 100;
    if (discount > 500) discount = 500;
    cart.tPAD = cart.totalPrice - discount;
  } else {
    cart.tPAD = cart.totalPrice;
  }
}

//  add to cart
let addToCart = handelAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  let { paymentPrice } = await productModel
    .findById(req.body.product)
    .select("paymentPrice");
  req.body.price = paymentPrice;
  let exist = await cartModel.findOne({ user: req.user._id });
  if (exist) {
    let item = exist.cartItems.find((ele) => ele.product == req.body.product);
    if (!item) exist.cartItems.push(req.body);
    if (item) item.quantity += 1;
    calcPrice(exist);
    calcDiscount(exist);
    await exist.save();
    res.json({ message: "success", cart: exist });
  } else {
    let cart = new cartModel({ user: req.user._id, cartItems: [req.body] });
    calcPrice(cart);
    calcDiscount(cart);
    await cart.save();
    res.json({ message: "success", cart });
  }
});

// delete cart
let deleteCart = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let exist = await cartModel.findOne({ user: req.user._id, _id: id });
  if (!exist) return next(new AppError("cart already deleted", 404));
  await cartModel.findByIdAndDelete(id);
  res.json({ message: "success" });
});

// remove cart item
let removeCartItem = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let existCart = await cartModel.findOne({ user: req.user._id });
  if (!existCart) return next(new AppError("Cart is Empty Go Shopping", 404));
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: id } } },
    { new: true }
  );
  calcPrice(cart);
  calcDiscount(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

// update cart quantity
let updateProductQuantity = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not exist", 404));
  let item = cart.cartItems.find((item) => item._id == id);
  if (!item) return next(new AppError("cart Product not exist", 404));
  item.quantity = req.body.quantity;
  calcPrice(cart);
  calcDiscount(cart);
  await cart.save();
  res.json({ message: "success", cart });
});

//  get user cart
let getUserCart = handelAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  res.json({ message: "success", cart });
});

export {
  addToCart,
  deleteCart,
  getUserCart,
  removeCartItem,
  updateProductQuantity,
};
