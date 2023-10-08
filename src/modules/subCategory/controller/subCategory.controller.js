import subCategoryModel from "../../../../DB/models/subCategory.model.js";
import ApiFeature from "../../../utils/Handler/ApiFeatures.js";
import * as refactor from "../../../utils/Handler/reFactor.handler.js";
import handelAsyncError from "../../../utils/middleware/handelAsyncError.js";

/** Get all subCategory  */
let getAllSubCategories = handelAsyncError(async (req, res, next) => {
  let { id } = req.params;
  if (id) {
    req.query.category = id;
  }
  // get total results in th model
  let results = await subCategoryModel.find();
  //  using ApiFeature for search in the model
  let mongoModel = new ApiFeature(subCategoryModel, req.query)
    .pagination() /** control the pages */
    .filter() /** control the filter  */
    .search() /** Searching in the name  */
    .sort() /** sort data */
    .fields(); /** chose fields */ /** chose populate */

  // call query
  let all = await mongoModel.model;
  // response
  res.json({
    message: "success",
    totalResults: results.length,
    metaData: {
      currentPage: mongoModel.page,
      numberOfPages: Math.floor(results.length / mongoModel.limit) + 1,
      limit: mongoModel.limit,
      results: all.length,
    },
    data: all,
  });
});

/** Add subCategory  */
let addSubCategory = refactor.addOne(subCategoryModel, "subCategory");

/** Update subCategory  */
let updateSubCategory = refactor.updateOne(subCategoryModel, "subCategory");

/** Delete subCategory  */
let deleteSubCategory = refactor.deleteOne(subCategoryModel, "subCategory");

/** specific  subCategory  */
let specificSubCategories = refactor.findOne(subCategoryModel);

export {
  getAllSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  specificSubCategories,
};
