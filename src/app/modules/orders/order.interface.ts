import { Types } from "mongoose"

export type TOrder = {
    biCycle: Types.ObjectId;
    user: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
  };