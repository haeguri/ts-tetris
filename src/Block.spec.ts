import Block from "./Block";
import BlockType from "./enums/BlockType";
import blocks from "./datas/blocks";
import { clone } from "lodash";

describe("Block", () => {
  describe("constructor", () => {
    it("it should set type using BlockType enum", () => {
      const block = new Block(BlockType.I);
      expect(block.type).toBe(BlockType.I);
    });

    it("it should set different cells by argument", () => {
      const blockI = new Block(BlockType.I);
      const blockJ = new Block(BlockType.J);
      expect(blockI.cells).toEqual(blocks.I);
      expect(blockJ.cells).toEqual(blocks.J);
    });

    it("it should throw error when not exist type of block", () => {
      try {
        new Block("dummy" as BlockType);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe("rotate with clockwise", () => {
    it("it should correctly rotate 'I' Block", () => {
      const block = new Block(BlockType.I);
      const originCells = clone(block.cells);
      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1],
          [1],
          [1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'J' Block", () => {
      const block = new Block(BlockType.J);
      const originCells = clone(block.cells);
      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1, 1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1],
          [1],
          [1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1, 1],
          [0, 0, 1],
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'L' Block", () => {
      const block = new Block(BlockType.L);
      const originCells = clone(block.cells);
      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1, 1],
          [1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1],
          [0, 1],
          [0, 1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 0, 1],
          [1, 1, 1],
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'O' Block", () => {
      const block = new Block(BlockType.O);
      const originCells = clone(block.cells);
      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'S' Block", () => {
      const block = new Block(BlockType.S);
      const originCells = clone(block.cells);
      block.rotate();

      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1],
          [0, 1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'T' Block", () => {
      const block = new Block(BlockType.T);
      const originCells = clone(block.cells);
      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [0, 1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1, 1],
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1],
          [1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'Z' Block", () => {
      const block = new Block(BlockType.Z);
      const originCells = clone(block.cells);
      block.rotate();

      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [1]
        ]
      );

      block.rotate();
      expect(block.cells).toEqual(originCells);
    });
  });

  describe("rotate with counterclockwise", () => {
    it("it should correctly rotate 'I' Block", () => {
      const block = new Block(BlockType.I);
      const originCells = clone(block.cells);
      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1],
          [1],
          [1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'J' Block", () => {
      const block = new Block(BlockType.J);
      const originCells = clone(block.cells);

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1, 1],
          [0, 0, 1],
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1],
          [1],
          [1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1, 1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'L' Block", () => {
      const block = new Block(BlockType.L);
      const originCells = clone(block.cells);

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 0, 1],
          [1, 1, 1],
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1],
          [0, 1],
          [0, 1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1, 1, 1],
          [1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'O' Block", () => {
      const block = new Block(BlockType.O);
      const originCells = clone(block.cells);
      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'S' Block", () => {
      const block = new Block(BlockType.S);
      const originCells = clone(block.cells);
      block.rotate(false);

      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1],
          [0, 1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'T' Block", () => {
      const block = new Block(BlockType.T);
      const originCells = clone(block.cells);

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [1],
          [1, 1],
          [1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1, 1],
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [0, 1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });

    it("it should correctly rotate 'Z' Block", () => {
      const block = new Block(BlockType.Z);
      const originCells = clone(block.cells);
      block.rotate(false);

      expect(block.cells).toEqual(
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [1]
        ]
      );

      block.rotate(false);
      expect(block.cells).toEqual(originCells);
    });
  });
});
