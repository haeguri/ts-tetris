import Block from "./Block";
import { MatrixPosition } from "./interfaces/MatrixPosition";
import Cells from "types/Cells";

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

  static getPositionsFromCells(pivotPosition: MatrixPosition, cells: Cells) {
    const positions: MatrixPosition[] = [];
    cells.forEach((rowCells, row) => {
      rowCells.forEach((cell, col) => {
        if (cell === 1) {
          positions.push({
            row: pivotPosition.row + row,
            col: pivotPosition.col + col
          });
        }
      });
    });
    return positions;
  }

  public isPushable(block: Block) {
    const positions = Matrix.getPositionsFromCells(
      {
        row: 0,
        col: Math.floor(this.width / block.width) - 1
      },
      block.cells
    );

    return positions.every(({ row, col }) => this.cells[row][col] === 0);
  }

  public pushNewBlock(block: Block) {
    if (this.movableBlock !== null) {
      throw new Error("Already exist movable block");
    }
    this.movableBlock = block;
  }
}
