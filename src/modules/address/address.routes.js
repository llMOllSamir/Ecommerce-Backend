import { protectedRoute } from "../../utils/middleware/protected.routes.js";

import { Router } from "express";
import { addAddress, deleteAddress } from "./address.controller.js";

let address = Router();

address.post("/", protectedRoute, addAddress);

address.delete("/:id", protectedRoute, deleteAddress);

export default address;
