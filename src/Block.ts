import BlockType from "./enums/BlockType";
import blocks from "./datas/blocks";

export default class Block {
  public type: BlockType;
  public cells: Array<number[]>;

  constructor(type: BlockType) {
    if (!(type in BlockType)) {
      throw new Error("block type is not valid");
    }

    this.type = type;
    this.cells = blocks[type];
  }

  public rotate(isClockWise: boolean = true) {
    const currHeight = this.cells.length;
    const currWidth = this.cells.reduce(
      (prev, curr) => Math.max(prev, curr.length),
      0
    );
    const nextHeight = currWidth;
    const nextCells: Array<number[]> = Array.from({ length: nextHeight });

    for (let currRow = currHeight - 1; currRow >= 0; currRow--) {
      const targetCells = [...this.cells[currRow]];

      for (let nextRow = 0; nextRow < nextHeight; nextRow++) {
        if (nextCells[nextRow] === undefined) {
          nextCells[nextRow] = [];
        }

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
