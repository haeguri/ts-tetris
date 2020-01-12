import BlockType from "enums/BlockType";
import blocks from "datas/blocks";
import Cells from "types/Cells";
import { MatrixPosition } from "./interfaces/MatrixPosition";

export default class Block {
  positions: MatrixPosition[];
  public type: BlockType;
  public cells: Cells;

  constructor(type: BlockType) {
    if (!(type in BlockType)) {
      throw new Error("block type is not valid");
    }

    this.type = type;
    this.cells = blocks[type];
  }

  public setPositions(positions: MatrixPosition[]) {
    this.positions = positions;
  }

  get height() {
    return this.cells.length;
  }

  get width() {
    return this.cells.reduce((prev, curr) => Math.max(prev, curr.length), 0);
  }

  public getPositionAfterMoveRight() {
    return this.positions.map(p => ({
      ...p,
      col: p.col + 1
    }));
  }

  public getPositionAfterMoveLeft() {
    return this.positions.map(p => ({
      ...p,
      col: p.col - 1
    }));
  }

  public getPositionAfterMoveDown() {
    return this.positions.map(p => ({
      ...p,
      row: p.row + 1
    }));
  }

  public moveLeft() {
    this.positions = this.getPositionAfterMoveLeft();
  }

  public moveRight() {
    this.positions = this.getPositionAfterMoveRight();
  }

  public moveDown() {
    this.positions = this.getPositionAfterMoveDown();
  }

  public rotate(isClockWise: boolean = true) {
    const nextHeight = this.width;
    const nextCells: Cells = Array.from({ length: nextHeight });

    for (let currRow = this.height - 1; currRow >= 0; currRow--) {
      const targetCells = [...this.cells[currRow]];

      for (let nextRow = 0; nextRow < nextHeight; nextRow++) {
        nextCells[nextRow] = nextCells[nextRow] ?? [];

        if (isClockWise) {
          nextCells[nextRow].push(targetCells[nextRow]);
        } else {
          nextCells[nextRow].unshift(targetCells[nextHeight - nextRow - 1]);
        }
      }
    }

    nextCells.forEach((rowCells, rowIndex) => {
      let lastFilledIndex = rowCells.reduce(
        (prev, curr, i) => (curr > 0 ? i : prev),
        0
      );

      nextCells[rowIndex] = rowCells
        .slice(0, lastFilledIndex + 1)
        .map(n => (n === undefined || n === 0 ? 0 : 1));
    });

    this.cells = nextCells;
  }
}
