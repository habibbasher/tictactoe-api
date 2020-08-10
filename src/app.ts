import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";

import { errorHandler, NotFoundError } from "@hubcom/common";

import { gameCreateRouter } from "./routes/create.game";
import { updateTicketRouter } from "./routes/update.game";
import { showGameRouter } from "./routes/get.game";
import { indexGameRouter } from "./routes/index";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());

app.use(gameCreateRouter);
app.use(updateTicketRouter);
app.use(showGameRouter);
app.use(indexGameRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
