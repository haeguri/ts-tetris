import Matrix from "./Matrix";
import blocks from "datas/blocks";
import BlockType from "enums/BlockType";
import Block from "./Block";

interface TetrisSetting {
  width: number;
  height: number;
  initialTickPeriod: number;
}

const blockSet = [
  BlockType.I,
  BlockType.J,
  BlockType.L,
  BlockType.O,
  BlockType.S,
  BlockType.T
];

export default class Tetris {
  readonly matrix: Matrix;

  private tickPeriod: number;
  private tickId?: number;

  constructor({ width, height, initialTickPeriod }: TetrisSetting) {
    this.matrix = new Matrix({ width, height });
    this.tickPeriod = initialTickPeriod;
  }

  get isTickStarted() {
    return this.tickId > 0;
  }

  public start() {
    this.tickId = (setInterval(() => {
      this.tick();
    }, this.tickPeriod) as unknown) as number;
  }

  public refreshTick(tickPeriod: number;) {
    clearInterval(this.tickId);

    this.tickPeriod = tickPeriod;
    this.start();
  }

  private tick() {
    if (this.matrix.selectedBlock === null) {
      this.matrix.pushNewBlock(
        new Block(blockSet[Math.floor(Math.random() * 5)])
      );
    }

    this.matrix.moveBlockToDown();
  }
}
