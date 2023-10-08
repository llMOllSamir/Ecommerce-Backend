import mongoose from "mongoose";

let connection = () => {
  mongoose
    .connect(process.env.DBCONNECTION)
    .then(() => {
      console.log("DB is Connected");
    })
    .catch((err) => {
      console.log("DB Not Connected ", err);
    });
};

export default connection;
