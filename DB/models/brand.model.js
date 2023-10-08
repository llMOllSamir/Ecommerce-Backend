import { model, Schema, Types } from "mongoose";
import slugify from "slugify";

let brandSchema = new Schema(
  {
    name: {
      type: String,
      min: [3, "name is too short 2 char"],
      trim: true,
      required: [true, "name is required"],
      unique: [true, "name is already exist"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    logo: {
      type: {},
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.pre("save", function () {
  this.slug = slugify(this.name);
});

brandSchema.post("find", function (docs) {
  docs &&
    docs.map((doc) => {
      doc.logo = doc?.logo?.secure_url;
    });
});

let brandModel = model("brand", brandSchema);

export default brandModel;
