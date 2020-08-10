import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest, BadRequestError } from "@hubcom/common";

import { Game } from "../models/game";

const router = express.Router();

router.post("/api/game/create", async (req: Request, res: Response) => {
  const { history, currentMove, winner } = req.body;

  const game = Game.build({ history, currentMove, winner });
  await game.save();

  res.status(201).send(game);
});

export { router as gameCreateRouter };
