import { config } from "dotenv";
import path from "path";
config({ path: path.resolve("config/.env") });
import express from "express";
import initApp from "./src/utils/initApp.js";
import connection from "./DB/connection.js";
import morgan from "morgan";
import cors from "cors";
/*======================
.....E-Commerce App......
========================*/
let app = express();
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
