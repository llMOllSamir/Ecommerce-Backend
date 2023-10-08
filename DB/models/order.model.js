import { model, Schema } from "mongoose";

let orderSchema = new Schema(
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
    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      city: String,
      street: String,
      phone: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    totalPrice: Number,
    orderId: Number,
  },
  {
    timestamps: true,
  }
);

let orderModel = model("order", orderSchema);

export default orderModel;
