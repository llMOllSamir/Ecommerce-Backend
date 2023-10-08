import { model, Schema, Types } from "mongoose";

let reviewsSchema = new Schema(
  {
    comment: {
      type: String,
      min: [3, "reviews must be more than 2 char"],
      max: [300, "reviews must be less than 300 char"],
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

reviewsSchema.pre("find", function () {
  this.populate("user", "name image");
});

let reviewsModel = model("review", reviewsSchema);

export default reviewsModel;
