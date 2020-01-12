import Block from "./Block";
import { MatrixPosition } from "./interfaces/MatrixPosition";
import Cells from "types/Cells";

interface ConstructorParams {
  width: number;
  height: number;
}

export default class Matrix {
  public selectedBlock: Block | null = null;
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
    const positions = Matrix.getPositionsFromCells(this.width, block);

    return this.isMovablePosition(positions);
  }

  public pushNewBlock(block: Block) {
    if (this.selectedBlock !== null) {
      throw new Error("Already exist movable block");
    }

    if (!this.isPushable(block)) {
      return;
    }

    this.selectedBlock = block;
    this.selectedBlock.setPositions(
      Matrix.getPositionsFromCells(this.width, block)
    );
  }

  public isMovablePosition(positions: MatrixPosition[]) {
    return positions.every(({ row, col }) => this.cells[row][col] === 0);
  }

  public moveDownBlock() {
    const positions = this.selectedBlock.getPositionAfterMoveDown();
    if (!this.isMovablePosition(positions)) {
      return;
    }

    this.selectedBlock.moveDown();
  }

  static getPositionsFromCells(matrixWidth: number, block: Block) {
    const pivot: MatrixPosition = {
      row: 0,
      col: Math.floor((matrixWidth - block.width) / 2)
    };
    const positions: MatrixPosition[] = [];

    block.cells.forEach((rowCells, row) => {
      rowCells.forEach((cell, col) => {
        if (cell === 1) {
          positions.push({
            row: pivot.row + row,
            col: pivot.col + col
          });
        }
      });
    });

    return positions;
  }
}
