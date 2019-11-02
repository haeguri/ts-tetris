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

  const assertRotation = (
    block: Block,
    assertionTargets: Array<number[][]>
  ) => {
    const originCells = clone(block.cells);
    assertionTargets.push(originCells);

    assertionTargets.forEach(t => {
      block.rotate();
      expect(block.cells).toEqual(t);
    });

    // 배열을 뒤집어서 역 방향 회전을 검사한다.
    assertionTargets.pop();
    assertionTargets.reverse();
    assertionTargets.push(originCells);

    assertionTargets.forEach(t => {
      block.rotate(false);
      expect(block.cells).toEqual(t);
    });
  };

  describe("rotate", () => {
    it("it should correctly rotate 'I' Block", () => {
      const block = new Block(BlockType.I);
      assertRotation(block, [
        // prettier-ignore
        [
          [1],
          [1],
          [1],
          [1]
        ]
      ]);
    });

    it("it should correctly rotate 'J' Block", () => {
      const block = new Block(BlockType.J);
      assertRotation(block, [
        // prettier-ignore
        [
          [1],
          [1, 1, 1]
        ],
        // prettier-ignore
        [
          [1, 1],
          [1],
          [1]
        ],
        [
          // prettier-ignore
          [1, 1, 1],
          [0, 0, 1]
        ]
      ]);
    });

    it("it should correctly rotate 'L' Block", () => {
      const block = new Block(BlockType.L);
      assertRotation(block, [
        // prettier-ignore
        [
          [1, 1, 1],
          [1]
        ],
        // prettier-ignore
        [
          [1, 1],
          [0, 1],
          [0, 1]
        ],
        // prettier-ignore
        [
          [0, 0, 1],
          [1, 1, 1],
        ]
      ]);
    });

    it("it should correctly rotate 'O' Block", () => {
      const block = new Block(BlockType.O);
      assertRotation(block, []);
    });

    it("it should correctly rotate 'S' Block", () => {
      const block = new Block(BlockType.S);
      assertRotation(block, [
        // prettier-ignore
        [
          [1],
          [1, 1],
          [0, 1]
        ]
      ]);
    });

    it("it should correctly rotate 'T' Block", () => {
      const block = new Block(BlockType.T);
      assertRotation(block, [
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [0, 1]
        ],
        // prettier-ignore
        [
          [0, 1],
          [1, 1, 1],
        ],
        // prettier-ignore
        [
          [1],
          [1, 1],
          [1]
        ]
      ]);
    });

    it("it should correctly rotate 'Z' Block", () => {
      const block = new Block(BlockType.Z);
      assertRotation(block, [
        // prettier-ignore
        [
          [0, 1],
          [1, 1],
          [1]
        ]
      ]);
    });
  });
});
