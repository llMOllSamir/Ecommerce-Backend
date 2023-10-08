import brandModel from "../../../../DB/models/brand.model.js";
import * as refactor from "../../../utils/Handler/reFactor.handler.js";

/** Get all brand  */
let getAllBrands = refactor.find(brandModel);

/** Add brand  */
let addBrand = refactor.addOne(brandModel, "brand", "logo");

/** Update brand  */
let updateBrand = refactor.updateOne(brandModel, "brand", "logo");

/** Delete brand  */
let deleteBrand = refactor.deleteOne(brandModel, "brand", "logo");

/** specific  Categories  */
let specificCategories = refactor.findOne(brandModel);

export { getAllBrands, addBrand, updateBrand, deleteBrand, specificCategories };
