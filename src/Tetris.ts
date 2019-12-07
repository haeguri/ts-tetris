import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "./enums/BlockType";

export default class Tetris {
  readonly matrix: Matrix;
  public movableBlock: Block | null = null;

  constructor(width: number, height: number) {
    this.matrix = new Matrix({ width, height });
  }

  public start() {
    // 들어갈 수 있나?
    // start timer
    // add controller
    // -> controller?
    // ->
    // render canvas per frame
    //
  }

  public pushNewBlock(type: BlockType) {
    if (this.movableBlock !== null) {
      throw new Error("Already exist movable block");
    }
    const block = new Block(type);
    this.movableBlock = block;
  }
}
