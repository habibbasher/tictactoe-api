import express, { Request, Response } from "express";
import { NotFoundError } from "@hubcom/common";

import { Game } from "../models/game";

const router = express.Router();

router.put("/api/games/:id", async (req: Request, res: Response) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    throw new NotFoundError();
  }

  game.set({
    history: req.body.history,
    currentMove: req.body.currentMove,
    winner: req.body.winner,
  });
  await game.save();

  res.status(200).send(game);
});

export { router as updateTicketRouter };
