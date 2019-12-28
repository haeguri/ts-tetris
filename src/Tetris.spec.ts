import Tetris from "./Tetris";
import BlockType from "enums/BlockType";
import Block from "./Block";

describe("Tetris", () => {
  describe("start", () => {
    it("TODO: 타이머를 초기화 한다.", () => {
      const tetris = new Tetris(6, 6);
      tetris.start();
    });
  });

  describe("pushNewBlock", () => {
    let tetris: Tetris;
    beforeEach(() => {
      // common given
      tetris = new Tetris(6, 6);
    });

    it("새로운 블락을 넣지 않으면, 움직일 수 있는 블락은 없다", () => {
      // then
      expect(tetris.movableBlock).toBeNull();
    });

    it("새로운 블락을 넣으면, 그 블락은 움직일 수 있는 블락이다.", () => {
      // when
      tetris.pushNewBlock(BlockType.I);
      // then
      expect(tetris.movableBlock).not.toBeNull();
    });

    it("움직일 수 있는 블락이 있으면, 새로운 블락을 넣을 수 없다.", () => {
      // given
      tetris.pushNewBlock(BlockType.J);
      // when
      const func = () => tetris.pushNewBlock(BlockType.J);
      // then
      expect(func).toThrowError("Already exist movable block");
    });

    it("움직일 수 있는 블락이 없어도, 자리가 없으면 새로운 블락을 넣을 수 없다.", () => {
      // const tetris1 = new Tetris(6, 6);
    });
  });

  describe("tick", () => {
    it("움직일 수 있는 블락이 있으면, 그 블락을 아래로 내린다.", () => {});
    it("움직일 수 있는 블락이 없으면, 새로운 블락을 넣는다", () => {});
  });
});
