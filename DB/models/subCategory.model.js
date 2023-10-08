import { model, Schema, Types } from "mongoose";
import slugify from "slugify";

let subCategorySchema = new Schema(
  {
    name: {
      type: String,
      min: [3, "subCategory name must be more than 2 char"],
      trim: true,
      required: [true, "name is required"],
      unique: [true, "name is already exist"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: {},
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

subCategorySchema.pre("save", function () {
  this.slug = slugify(this.name);
});

subCategorySchema.post("find", function (docs) {
  docs &&
    docs.map((doc) => {
      doc.image = doc?.image?.secure_url;
    });
});

subCategorySchema.pre("find", function () {
  this.populate("category", "name");
});

subCategorySchema.pre(/^(findOne|findById)/, function () {
  if (this._update?.name) {
    this._update.slug = slugify(this._update.name);
  }
});

let subCategoryModel = model("subCategory", subCategorySchema);

export default subCategoryModel;
