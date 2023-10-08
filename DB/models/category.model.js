import { model, Schema, Types } from "mongoose";
import slugify from "slugify";

let categorySchema = new Schema(
  {
    name: {
      type: String,
      min: [3, "category name must be more than 3 char"],
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
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function () {
  this.slug = slugify(this.name);
});

categorySchema.post("find", function (docs) {
  docs &&
    docs.map((doc) => {
      doc.image = doc?.image?.secure_url;
    });
});

categorySchema.pre(/^(findOne|findById)/, function () {
  if (this._update?.name) {
    this._update.slug = slugify(this._update.name);
  }
});

let categoryModel = model("category", categorySchema);

export default categoryModel;
