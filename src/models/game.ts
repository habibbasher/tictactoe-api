import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new Game
interface History {
  board: [];
  isXNext: boolean;
}

interface GameAttrs {
  history: History[];
  currentMove: number;
  winner: string;
}

// An interface that describes the properties
// that a Game Document has
interface GameDoc extends mongoose.Document {
  history: History[];
  currentMove: number;
  winner: string;
}

// An interface that describes the properties
// that a Game Model has
interface GameModel extends mongoose.Model<GameDoc> {
  build(attrs: GameAttrs): GameDoc;
}

const gameSchema = new mongoose.Schema(
  {
    history: {
      type: Array,
    },
    currentMove: {
      type: Number,
    },
    winner: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

gameSchema.statics.build = (attrs: GameAttrs) => {
  return new Game(attrs);
};

const Game = mongoose.model<GameDoc, GameModel>("Game", gameSchema);

export { Game };
