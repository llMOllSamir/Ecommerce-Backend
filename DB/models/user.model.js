import { model, Schema, Types } from "mongoose";
import bcrybt from "bcrypt";
let userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      min: [3, "name must be more than 2 char"],
      max: [30, "name must be less than 30 char"],
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email is Already Register"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "You not allowed to use this website"],
      required: true,
    },
    phone: Number,
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    image: {
      type: {},
    },
    address: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],
    blocked: {
      type: Boolean,
      default: false,
    },
    wishList: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
    changePasswordAt: Date,
    resetCode: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function () {
  this.password = bcrybt.hashSync(this.password, 7);
});

userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this._update.password = bcrybt.hashSync(this._update.password, 7);
  }
});
userSchema.post("find", function () {
  this.password = null;
});

let userModel = model("user", userSchema);

export default userModel;
