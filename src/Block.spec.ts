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

  describe("rotate", () => {
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
  });
});
