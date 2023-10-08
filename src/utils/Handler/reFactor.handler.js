import slugify from "slugify";
import handelAsyncError from "../middleware/handelAsyncError.js";
import AppError from "../services/appError.js";
import ApiFeature from "./ApiFeatures.js";
import {
  destroyMany,
  destroyOne,
  uploadOne,
} from "./../cloudinary/fileUploader.js";

/**
 * add one Document in the collection
 */

let addOne = (model, modelName = "item", fieldName = "image") => {
  return handelAsyncError(async (req, res, next) => {
    // check is exist in the DataBase Or not For not Duplicated it
    let exist = await model.findOne({ name: req.body.name });
    // send an error for Duplicated
    if (exist) return next(new AppError(`${modelName} is Already Exist`, 402));
    // create a new document in the model
    let newOne = new model(req.body);
    // upload the document image in cloudinary
    if (req.file) {
      newOne[fieldName] = await uploadOne(req.file, modelName);
    }
    // save the document in the model in Data Base
    await newOne.save();
    // respond FrontEnd With the new document
    res.json({ message: "success", data: newOne });
  });
};

/**
 * delete one Document in the collection
 */
let deleteOne = (model, modelName = "item", fieldName = "image") => {
  return handelAsyncError(async (req, res, next) => {
    let { id } = req.params;
    // check is exist in the DataBase Or not
    let existed = await model.findById(id);
    if (existed) {
      // delete the document
      let deleted = await model.findByIdAndDelete(id);
      // delete the image from cloudinary
      if (existed[fieldName]) {
        await destroyOne(existed[fieldName].public_id);
      }
      if (existed.images) {
        await destroyMany(existed.images);
      }
      // respond FrontEnd With the deleted document
      res.json({ message: "success", data: deleted });
    } else {
      // send an error for not Found document
      next(new AppError(`${modelName} is not exist`, 404));
    }
  });
};

/**
 * Update one Document in the collection
 */
let updateOne = (model, modelName = "item", fieldName = "image") => {
  return handelAsyncError(async (req, res, next) => {
    let { id } = req.params;
    // check is exist in the DataBase Or not
    let existed = await model.findById(id);
    if (existed) {
      // check is there a new photo for upload
      if (req.file?.path) {
        // add the new image path
        req.body[fieldName] = await uploadOne(req.file, modelName);
        // delete the image from cloudinary
        if (existed[fieldName]) {
          await destroyOne(existed[fieldName].public_id);
        }
      }
      // update the document in the collection
      let updated = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // respond FrontEnd With the deleted document
      res.json({ message: "success", data: updated });
    } else {
      // send an error for not Found document
      next(new AppError(`${modelName} is not exist`, 404));
    }
  });
};

/**
 * find all  Document in the collection
 */
let find = (model) => {
  return handelAsyncError(async (req, res, next) => {
    // get total results in th model
    let results = await model.find();
    //  using ApiFeature for search in the model
    let mongoModel = new ApiFeature(model, req.query)
      .pagination() /** control the pages */
      .filter() /** control the filter  */
      .search() /** Searching in the name  */
      .sort() /** sort data */
      .fields(); /** chose fields */
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
};

/**
 * find specific Document in the collection
 */
let findOne = (model) => {
  return handelAsyncError(async (req, res, next) => {
    let { id } = req.params;
    //  get data
    let data = await model.find({ _id: id });
    // response
    res.json({
      message: "success",
      metaData: {
        currentPage: 1,
        limit: 1,
        results: data.length,
      },
      data,
    });
  });
};

export { deleteOne, updateOne, addOne, find, findOne };
