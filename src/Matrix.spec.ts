import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "./enums/BlockType";

describe("Matrix", () => {
  describe("initCells", () => {
    it("should set width, height", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      expect(matrix.width).toEqual(6);
      expect(matrix.height).toEqual(6);
    });

    it("should receive positive number", () => {
      try {
        new Matrix({ width: -1, height: -1 });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("width, height is must be positive number");
      }
    });

    it("should receive number as only even number", () => {
      try {
        new Matrix({ width: 5, height: 5 });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("width, height is must be even number");
      }
    });

    it("should make 6x6 matrix when width/height is 6.", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      matrix.initCells();
      expect(matrix.cells).toEqual([
        // prettier-ignore
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
  });

  describe("pushNewBlock", () => {
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 6, height: 6 });
      matrix.initCells();
    });

    it("should change cells field by block", () => {
      const block = new Block(BlockType.I);
      matrix.pushNewBlock(block);
      expect(matrix.cells).toEqual([
        // prettier-ignore
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
  });

  describe("getColumnindexForNewBlock", () => {
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 10, height: 10 });
      matrix.initCells();
    });

    it("should get column index for push I block", () => {
      const iBlock = new Block(BlockType.I);
      let index = matrix.getColumnIndexForNewBlock(iBlock);
      expect(index).toBe(3);
      iBlock.rotate();
      index = matrix.getColumnIndexForNewBlock(iBlock);
      expect(index).toBe(4);
    });

    it("should get column index for push J block", () => {
      const jBlock = new Block(BlockType.J);
      let index = matrix.getColumnIndexForNewBlock(jBlock);
      expect(index).toBe(4);
      jBlock.rotate();
      index = matrix.getColumnIndexForNewBlock(jBlock);
      expect(index).toBe(3);
    });
  });
});
