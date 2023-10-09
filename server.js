import { config } from "dotenv";
config({});
import express from "express";
import initApp from "./src/utils/initApp.js";
import connection from "./DB/connection.js";
import morgan from "morgan";
import cors from "cors";
import { onlineOrder } from "./src/modules/order/controller/order.controller.js";
/*======================
.....E-Commerce App......
========================*/
let app = express();
// online payment 
app.post("/webhook", express.raw({ type: "application/json" }), onlineOrder);
/*== handel buffer  ==*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

/*== Connect with database ==*/
connection();
/*== APIS  ==*/

initApp(app);

/* == server running  ==*/
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on port ${process.env.PORT || 4000}`);
});
