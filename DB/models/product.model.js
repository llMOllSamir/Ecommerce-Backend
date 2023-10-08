import { model, Schema, Types } from "mongoose";
import slugify from "slugify";

let productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: [3, "product trim must be more than 2 char"],
      max: [60, "product trim must be less than 60 char"],
      required: [true, "trim is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      min: [10, "description must be more than 10 char"],
      max: [300, "write description in max 300 char"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    paymentPrice: {
      type: Number,
      default: 0,
    },
    colors: {
      type: [String],
    },
    size: {
      type: String,
      enum: ["sm", "m", "lg", "xl", "xxl"],
    },
    imageCover: {},
    images: {
      type: [{}],
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "category is required"],
    },
    subCategory: {
      type: Types.ObjectId,
      ref: "subCategory",
      required: [true, "subCategory is required"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "min rate is 1"],
      max: [5, "max rate is 5"],
      default: 1,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});

productSchema.pre("save", function () {
  if (this.title) this.slug = slugify(this.title);
  this.discount
    ? (this.paymentPrice = this.price - (this.price * this.discount) / 100)
    : (this.paymentPrice = this.price);
});

productSchema.pre("findOneAndUpdate", function () {
  let updated = this._update;
  if (updated.title) {
    updated.slug = slugify(updated.title);
  }
  updated.discount
    ? (updated.paymentPrice =
        updated.price - (updated.price * updated.discount) / 100)
    : (updated.paymentPrice = updated.price);
});

productSchema.pre("find", function () {
  this.populate("brand", "name");
  this.populate("category", "name");
  this.populate("subCategory", "name");
  this.populate("reviews");
});

productSchema.post("find", function (docs) {
  docs &&
    docs.map((doc) => {
      doc.imageCover = doc.imageCover?.secure_url;
      doc.images = doc.images.map((image) => image.secure_url);
    });
});

let productModel = model("product", productSchema);

export default productModel;
