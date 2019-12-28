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

  describe("pushNewBlock", () => {
    let matrix: Matrix;
    beforeEach(() => {
      matrix = new Matrix({ width: 6, height: 6 });
    });

    it("새로운 블락을 넣지 않으면, 움직일 수 있는 블락은 없다", () => {
      // then
      expect(matrix.movableBlock).toBeNull();
    });

    it("새로운 블락을 넣으면, 그 블락은 움직일 수 있는 블락이다.", () => {
      // when
      matrix.pushNewBlock(BlockType.I);
      // then
      expect(matrix.movableBlock).not.toBeNull();
    });

    it("움직일 수 있는 블락이 있으면, 새로운 블락을 넣을 수 없다.", () => {
      // given
      matrix.pushNewBlock(BlockType.J);
      // when
      const func = () => matrix.pushNewBlock(BlockType.J);
      // then
      expect(func).toThrowError("Already exist movable block");
    });

    it("움직일 수 있는 블락이 없어도, 자리가 없으면 새로운 블락을 넣을 수 없다.", () => {
      // const tetris1 = new Tetris(6, 6);
    });
  });
});
