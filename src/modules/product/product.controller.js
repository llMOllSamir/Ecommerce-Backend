import productModel from "../../../DB/models/product.model.js";
import * as reFactor from "../../utils/Handler/reFactor.handler.js";
import {
  destroyMany,
  destroyOne,
  uploadMany,
  uploadOne,
} from "../../utils/cloudinary/fileUploader.js";
import handelAsyncError from "../../utils/middleware/handelAsyncError.js";

// get all Products
let getAllProducts = reFactor.find(productModel);
// Get one Product
let getOneProduct = reFactor.findOne(productModel);
//  Add Product
let addProduct = handelAsyncError(async (req, res, next) => {
  // add image cover
  if (req.files.imageCover) {
    req.body.imageCover = await uploadOne(
      req.files.imageCover[0],
      "products/" + req.body.title
    );
  }
  // add images
  if (req.files.images) {
    req.body.images = await uploadMany(
      req.files.images,
      "products/" + req.body.title
    );
  }
  // Create Product
  let newProduct = new productModel(req.body);
  await newProduct.save();
  res.json({ message: "Success", newProduct });
});
// Update Product
let updateProduct = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  // check is exist in the DataBase Or not
  let existed = await productModel.findById(id);
  if (existed) {
    // check is there a new photo for upload
    if (req.files?.imageCover) {
      // add the new image path
      req.body.imageCover = await uploadOne(
        req.files.imageCover[0],
        "products/" + existed.title
      );
      if (existed.imageCover) {
        await destroyOne(existed.imageCover.public_id);
      }
    }
    if (req.files?.images) {
      req.body.images = await uploadMany(
        req.files.images,
        "products/" + existed.title
      );
      if (existed["images"]) {
        await destroyMany(existed["images"]);
      }
    }
    // update the document in the collection
    let updated = await productModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    // respond FrontEnd With the deleted document
    res.json({ message: "success", data: updated });
  } else {
    // send an error for not Found document
    next(new AppError(`Product is not exist`, 404));
  }
});
// Delete Product
let deleteProduct = reFactor.deleteOne(productModel, "product", "imageCover");

// export Methods
export {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
