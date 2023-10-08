import { model, Schema } from "mongoose";

let cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: Number,
    discount: Number,
    tPAD: Number,
  },
  {
    timestamps: true,
  }
);

let cartModel = model("cart", cartSchema);

export default cartModel;
