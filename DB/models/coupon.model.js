import { model, Schema, Types } from "mongoose";
import qrCode from "qrcode";

let couponSchema = new Schema(
  {
    coupon: {
      type: String,
      min: [3, "name is too short 3 char"],
      trim: true,
      required: true,
      unique: true,
    },
    qrCode: String,
    discount: {
      type: Number,
      required: true,
    },
    expiries: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    usedBy: {
      type: [
        {
          type: Types.ObjectId,
          ref: "user",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
couponSchema.pre("save", async function () {
  this.qrCode = await qrCode.toDataURL(this.coupon);
});

couponSchema.pre("findOneAndUpdate", async function () {
  if (this._update.coupon) {
    this._update.qrCode = await qrCode.toDataURL(this._update.coupon);
  }
});
let couponModel = model("coupon", couponSchema);

export default couponModel;
