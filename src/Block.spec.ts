import Block from "./Block";
import BlockType from "enums/BlockType";
import { clone } from "lodash";
import blocks from "datas/blocks";

describe("Block", () => {
  describe("constructor", () => {
    it("존재하지 않는 타입의 블락을 인자로 받으면 예외를 던진다.", () => {
      try {
        new Block("dummy" as BlockType);
        fail();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe("moveRight", () => {
    it("원래 위치가 [{row: 2, col: 2}, {row: 2, col: 3}, {row: 2, col: 4}, {row: 3, col: 4}]이면 이동 후에는 col이 1씩 증가한다.", () => {
      // given
      const block = new Block(BlockType.O);
      block.setPositions([
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
        { row: 3, col: 4 }
      ]);

      // when
      block.moveRight();

      // then
      expect(block.positions).toEqual([
        { row: 2, col: 3 },
        { row: 2, col: 4 },
        { row: 2, col: 5 },
        { row: 3, col: 5 }
      ]);
    });
  });

  describe("moveLeft", () => {
    it("원래 위치가 [{row: 1, col: 1}, {row: 1, col: 2}, {row: 2, col: 2}, {row: 2, col: 3}]이면 이동 후에는 col이 1씩 감소한다.", () => {
      // given
      const block = new Block(BlockType.O);
      block.setPositions([
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 3 }
      ]);

      // when
      block.moveLeft();

      // then
      expect(block.positions).toEqual([
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 2 }
      ]);
    });
  });

  describe("moveDown", () => {
    it("원래 위치가 [{row: 0, col: 0}, {row: 0, col: 1}, {row: 1, col: 0}, {row: 1, col: 1}]이면 이동 후에는 row가 1씩 증가한다.", () => {
      // given
      const block = new Block(BlockType.O);
      block.setPositions([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 }
      ]);

      // when
      block.moveDown();

      // then
      expect(block.positions).toEqual([
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
        { row: 2, col: 1 }
      ]);
    });
  });

  describe("rotate", () => {
    describe("I 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.I);
      });

      it("시계 방향으로 회전하면 'I' 모양이 된다. ", () => {
        // when
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [1], // cells[0][0] // 1행 1열
            [1], // cells[1][0] // 2행 1열
            [1], // cells[2][0] // 3행 1열
            [1], // cells[3][0] // 4행 1열
          ]
        );
      });

      it("시계 반대 방향으로 회전해도 'I' 모양이 된다.", () => {
        // when
        block.rotate(false);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [1],
            [1],
            [1],
            [1]
          ]
        );
      });
    });

    describe("J 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.J);
      });

      it("시계 방향으로 1번 회전하면 'ㄴ' 모양이 된다.", () => {
        // when
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [1],      // cells[0][0] // 1행 1열
            [1, 1, 1] // cells[1][0], cells[1][1], cells[1][2] // 2행 1열, 2행 2열, 2행 3열
          ]
        );
      });

      it("시계 반대 방향으로 4번 회전하면 원래 모양으로 되돌아온다.", () => {
        // given
        const originCells = clone(block);

        // when
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });

    describe("L 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.L);
      });

      it("시계 방향으로 2번 회전하면 'ㄱ' 모양이 된다.", () => {
        // when
        block.rotate(true);
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [1, 1],
            [0, 1],
            [0, 1]
          ]
        );
      });

      it("시계 반대 방향으로 4번 회전하면 원래 모양으로 되돌아온다.", () => {
        // given
        const originCells = clone(block);

        // when
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });

    describe("O 블락", () => {
      it("시계 방향으로 1번 회전해도 원래 모양이다.", () => {
        // given
        const block = new Block(BlockType.O);
        const originCells = clone(block);

        // when
        block.rotate(true);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });

    describe("S 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.S);
      });

      it("시계 방향으로 1번 회전하면 다음과 같은 모양으로 된다.", () => {
        // when
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [1],
            [1, 1],
            [0, 1]
          ]
        );
      });

      it("시계 반대 방향으로 2번 회전하면 원래 모양으로 되돌아온다.", () => {
        // given
        const originCells = clone(block);

        // when
        block.rotate(false);
        block.rotate(false);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });

    describe("T 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.T);
      });

      it("시계 방향으로 2번 회전하면 'ㅗ' 모양이 된다.", () => {
        // when
        block.rotate(true);
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [0, 1],
            [1, 1, 1]
          ]
        );
      });

      it("시계 반대 방향으로 4번 회전하면 원래 모양으로 되돌아온다.", () => {
        // given
        const originCells = clone(block);

        // when
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);
        block.rotate(false);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });

    describe("Z 블락", () => {
      let block: Block;
      beforeEach(() => {
        // given
        block = new Block(BlockType.Z);
      });

      it("시계 방향으로 1번 회전하면 다음과 같은 모양이 된다.", () => {
        // when
        block.rotate(true);

        // then
        expect(block.cells).toEqual(
          // prettier-ignore
          [
            [0, 1],
            [1, 1],
            [1]
          ]
        );
      });

      it("시계 반대 방향으로 2번 회전하면 원래 모양으로 되돌아온다.", () => {
        // given
        const originCells = clone(block);

        // when
        block.rotate(false);
        block.rotate(false);

        // then
        expect(block.cells).toEqual(originCells.cells);
      });
    });
  });
});
