import "dotenv/config";
import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.HOST_NAME || !process.env.DEV_DB_NAME) {
    throw new Error("HOST_NAME and DEV_DB_NAME must be defined");
  }

  const { HOST_NAME, DEV_DB_NAME } = process.env;

  try {
    await mongoose.connect(`mongodb://${HOST_NAME}/${DEV_DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log("Listening on port 5000!");
  });
};

start();
