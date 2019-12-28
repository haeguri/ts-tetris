import Block from "./Block";
import BlockType from "enums/BlockType";

interface ConstructorParams {
  width: number;
  height: number;
}

export default class Matrix {
  public movableBlock: Block | null = null;
  public width: number;
  public height: number;
  public cells: number[][];

  constructor({ width, height }: ConstructorParams) {
    if (width <= 0 || height <= 0) {
      throw new Error("width, height is must be positive number");
    }

    if (width % 2 !== 0 || height % 2 !== 0) {
      throw new Error("width, height is must be even number");
    }

    this.width = width;
    this.height = height;
    this.cells = Array.from<number[]>({ length: height }).map(_ =>
      Array.from<number>({ length: width }).fill(0)
    );
  }

  public isPushable(block: Block) {
    const leftBottomRow = 0;
    const leftBottomCol = Math.floor(this.width / block.width) - 1;

    const bottomCells = [];
    for (let c = 0; c < block.width; c++) {
      bottomCells.push({
        row: leftBottomRow,
        col: leftBottomCol + c
      });
    }

    return bottomCells.every(({ row, col }) => this.cells[row][col] === 0);
  }

  public pushNewBlock(type: BlockType) {
    if (this.movableBlock !== null) {
      throw new Error("Already exist movable block");
    }
    const block = new Block(type);
    this.movableBlock = block;
  }

  // public pushNewBlock({ row, col }: MatrixPosition, block: Block) {
  //   block.cells.forEach((rowCells, rIndex) => {
  //     rowCells.forEach((_, cIndex) => {
  //       this.cells[row + rIndex][col + cIndex] = col;
  //     });
  //   });
  // }

  // public getRowIndexForNewBlock() {
  //   return 0;
  // }

  // public getColumnIndexForNewBlock(block: Block) {
  //   return Math.floor((this.width - block.width) / 2);
  // }
}
