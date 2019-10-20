import BlockType from "./enums/BlockType";
import blocks from "./datas/blocks";

export default class Block {
  public type: BlockType;
  public cells: Array<number[]>;

  constructor(type: BlockType) {
    this.type = type;
    this.init(type);
  }

  private init(type: BlockType) {
    if (!(type in BlockType)) {
      throw new Error("block type is not valid");
    }

    this.cells = blocks[type];
  }

  public rotate(isClockWise: boolean = true) {}
}
