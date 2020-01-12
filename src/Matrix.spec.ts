import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "enums/BlockType";

describe("Matrix", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

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

  describe("getPositionsFromCells", () => {
    it("매트릭스 너비가 6이고 'O' 블락이면 위치는 [{row: 0, col: 2}, {row: 0, col: 3}, {row: 1, col: 2}, {row: 1, col:3}]가 반환되야 한다.", () => {
      // given
      const block: Block = new Block(BlockType.O);
      const matrixWidth = 6;

      // when
      const result = Matrix.getPositionsFromCells(matrixWidth, block);

      // then
      expect(result).toEqual([
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 3 }
      ]);
    });

    it("매트리스 너비가 6이고 'I' 블락이 입력되면 [{row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}]가 반환되야 한다.", () => {
      // given
      const block: Block = new Block(BlockType.I);
      const matrixWidth = 6;

      // when
      const result = Matrix.getPositionsFromCells(matrixWidth, block);

      // then
      expect(result).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 }
      ]);
    });
  });

  describe("isPushable", () => {
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 6, height: 6 });
    });

    it("공간이 있으면 블락을 넣을 수 있다.", () => {
      const block = new Block(BlockType.O);
      // prettier-ignore
      matrix.cells = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0]
      ]
      expect(matrix.isPushable(block)).toBe(true);
    });

    it("공간이 없으면 블락을 넣을 수 없다.", () => {
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
      expect(matrix.isPushable(block)).toBe(false);
    });
  });

  describe("pushNewBlock", () => {
    it("처음에는 움직일 수 있는 블락이 없다.", () => {
      // given
      const matrix = new Matrix({ width: 6, height: 6 });

      // when
      // nothing

      // then
      expect(matrix.selectedBlock).toBeNull();
    });

    it("새로운 블락을 넣으면, 그 블락은 움직일 수 있는 블락이다.", () => {
      // given
      const matrix = new Matrix({ width: 6, height: 6 });
      const block = new Block(BlockType.I);

      // when
      matrix.pushNewBlock(block);

      // then
      expect(matrix.selectedBlock).toEqual(block);
    });

    it("움직일 수 있는 블락이 있으면, 새로운 블락을 넣을 수 없다.", () => {
      // given
      const matrix = new Matrix({ width: 6, height: 6 });
      const prevPushBlock = new Block(BlockType.J);
      matrix.pushNewBlock(prevPushBlock);

      // when
      const nextPushBlock = new Block(BlockType.T);
      const callPushNewBlock = () => matrix.pushNewBlock(nextPushBlock);

      // then
      expect(callPushNewBlock).toThrowError("Already exist movable block");
      expect(matrix.selectedBlock).not.toEqual(nextPushBlock);
      expect(matrix.selectedBlock).toEqual(prevPushBlock);
    });
  });

  describe("moveDown", () => {
    it("아래에 자리가 있으면 블락을 아래로 이동한다.", () => {
      // given
      const matrix = new Matrix({ width: 6, height: 6 });
      const block = new Block(BlockType.Z);
      const moveDown = jest.spyOn(block, "moveDown");
      matrix.cells = [
        // prettier-ignore
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      matrix.pushNewBlock(block);

      // when
      matrix.moveBlockToDown();

      // then
      expect(moveDown).toBeCalledTimes(1);
    });

    it("아래에 자리가 없으면 블락은 이동되지 않는다.", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      const block = new Block(BlockType.Z);
      const moveDown = jest.spyOn(block, "moveDown");
      matrix.cells = [
        // prettier-ignore
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      matrix.pushNewBlock(block);

      // when
      matrix.moveBlockToDown();

      // then
      expect(moveDown).toBeCalledTimes(0);
    });
  });
});
