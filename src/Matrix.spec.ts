import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "enums/BlockType";

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
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 6, height: 6 });
    });

    it("처음에는 움직일 수 있는 블락이 없다.", () => {
      // then
      expect(matrix.movableBlock).toBeNull();
    });

    it("새로운 블락을 넣으면, 그 블락은 움직일 수 있는 블락이다.", () => {
      // given
      const block = new Block(BlockType.I);

      // when
      matrix.pushNewBlock(block);

      // then
      expect(matrix.movableBlock).toEqual(block);
    });

    it("움직일 수 있는 블락이 있으면, 새로운 블락을 넣을 수 없다.", () => {
      // given
      const prevPushBlock = new Block(BlockType.J);
      matrix.pushNewBlock(prevPushBlock);

      // when
      const nextPushBlock = new Block(BlockType.T);
      const callPushNewBlock = () => matrix.pushNewBlock(nextPushBlock);

      // then
      expect(callPushNewBlock).toThrowError("Already exist movable block");
      expect(matrix.movableBlock).not.toEqual(nextPushBlock);
      expect(matrix.movableBlock).toEqual(prevPushBlock);
    });
  });
});
