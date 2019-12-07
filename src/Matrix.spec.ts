import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "./enums/BlockType";
import { MatrixPosition } from "./interfaces/MatrixPosition";

describe("Matrix", () => {
  describe("constructor", () => {
    it("should set width, height, cells", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      expect(matrix.width).toEqual(6);
      expect(matrix.height).toEqual(6);
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

    it("should receive positive number", () => {
      try {
        new Matrix({ width: -1, height: -1 });
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("width, height is must be positive number");
      }
    });

    it("should receive number as only even number", () => {
      try {
        new Matrix({ width: 5, height: 5 });
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("width, height is must be even number");
      }
    });
  });

  describe("isPushable", () => {
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 6, height: 6 });
    });
    it("매트리스가 비었을 때는 블락을 넣을 수 있다.", () => {
      // given
      const block = new Block(BlockType.I);
      // then
      expect(matrix.isPushable(block)).toBe(true);
    });

    it("매트리스가 안비어도 자리가 있으면 블락을 넣을 수 있다.", () => {
      const block = new Block(BlockType.O);
      // prettier-ignore
      matrix.cells = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0]
      ]
      expect(matrix.isPushable(block)).toBe(true);
    });

    it("매트리스가 안비었으면 블락을 넣을 수 없다.", () => {
      const block = new Block(BlockType.J);
      // prettier-ignore
      matrix.cells = [
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0]
      ];
      expect(matrix.isPushable(block)).toBe(false);
      // prettier-ignore
      matrix.cells = [
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0]
      ];
      expect(matrix.isPushable(block)).toBe(false);
    });
  });

  // describe("pushNewBlock", () => {
  //   let matrix: Matrix;
  //   beforeEach(() => {
  //     matrix = new Matrix({ width: 6, height: 6 });
  //     matrix.initCells();
  //   });

  //   it("should change cells field by block", () => {
  //     const block = new Block(BlockType.I);
  //     matrix.pushNewBlock(
  //       { row: matrix.height - 1, col: 1 } as MatrixPosition,
  //       block
  //     );

  //     expect(matrix.cells).toEqual([
  //       // prettier-ignore
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 1, 1, 1, 1, 0]
  //     ]);
  //   });

  //   it("should change cells field by rotated block", () => {
  //     const block = new Block(BlockType.I);
  //     block.rotate();
  //     matrix.pushNewBlock(
  //       { row: matrix.height - 1, col: 1 } as MatrixPosition,
  //       block
  //     );

  //     expect(matrix.cells).toEqual([
  //       // prettier-ignore
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0],
  //       [0, 1, 0, 0, 0, 0],
  //       [0, 1, 0, 0, 0, 0],
  //       [0, 1, 0, 0, 0, 0],
  //       [0, 1, 0, 0, 0, 0]
  //     ]);
  //   });
  // });

  // describe("getColumnindexForNewBlock", () => {
  //   let matrix: Matrix;
  //   beforeEach(() => {
  //     matrix = new Matrix({ width: 10, height: 10 });
  //     matrix.initCells();
  //   });

  //   it("should get column index for push I block", () => {
  //     const iBlock = new Block(BlockType.I);
  //     let index = matrix.getColumnIndexForNewBlock(iBlock);
  //     expect(index).toBe(3);
  //     iBlock.rotate();
  //     index = matrix.getColumnIndexForNewBlock(iBlock);
  //     expect(index).toBe(4);
  //   });

  //   it("should get column index for push J block", () => {
  //     const jBlock = new Block(BlockType.J);
  //     let index = matrix.getColumnIndexForNewBlock(jBlock);
  //     expect(index).toBe(4);
  //     jBlock.rotate();
  //     index = matrix.getColumnIndexForNewBlock(jBlock);
  //     expect(index).toBe(3);
  //   });
  // });
});
