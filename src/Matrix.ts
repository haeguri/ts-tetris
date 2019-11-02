import Block from "./Block";
import printCell from "./utils/printCell";

interface ConstructorParams {
  width: number;
  height: number;
}

export default class Matrix {
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
  }

  public initCells() {
    this.cells = Array.from<number[]>({ length: this.height }).map(_ =>
      Array.from<number>({ length: this.width }).fill(0)
    );
  }

  public pushNewBlock(block: Block) {
    const leftTopRowIndex = 0;
    const leftTopColIndex = this.getColumnIndexForNewBlock(block);
    block.cells.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        this.cells[leftTopRowIndex + rowI][leftTopColIndex + colI] = col;
      });
    });
  }

  public getColumnIndexForNewBlock(block: Block) {
    return Math.floor((this.width - block.width) / 2);
  }
}
