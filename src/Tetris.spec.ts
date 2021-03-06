import Tetris from "./Tetris";

describe("Tetris", () => {
  let tetris: Tetris;
  const TICK_PERIOD = 1000;
  beforeEach(() => {
    tetris = new Tetris({
      width: 6,
      height: 6,
      initialTickPeriod: TICK_PERIOD
    });
  });

  describe("tick", () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
    });

    it("테트리스가 시작되면 tick이 시작된다.", () => {
      // when
      tetris.start();

      // then
      expect(tetris.isTickStarted).toBe(true);
    });

    it("tick은 매트리스에 움직일 수 있는 블락이 없으면 새로운 블락을 넣는다.", () => {
      // given
      const pushNewBlock = jest.spyOn(tetris.matrix, "pushNewBlock");
      tetris.start();

      // when
      jest.advanceTimersByTime(TICK_PERIOD * 1);

      // then
      expect(pushNewBlock).toBeCalledTimes(1);
    });

    it("tick은 매트리스에 움직일 수 있는 블락이 있으면 새로운 블락을 넣지 않는다.", () => {
      // given
      const pushNewBlock = jest.spyOn(tetris.matrix, "pushNewBlock");
      tetris.start();

      // when
      jest.advanceTimersByTime(TICK_PERIOD * 2);

      // then
      expect(pushNewBlock).toBeCalledTimes(1);
    });

    it("tick은 매트리스에 움직일 수 있는 블락이 있으면, 그 블락을 아래로 움직인다.", () => {
      // given
      const moveBlockToDown = jest.spyOn(tetris.matrix, "moveBlockToDown");
      tetris.start();

      // when
      jest.advanceTimersByTime(TICK_PERIOD * 1);

      // then
      expect(moveBlockToDown).toBeCalledTimes(1);
    });

    it("tick이 시작된 후 tick 주기를 변경할 수 있다.", () => {
      // given
      const NEW_TICK_PERIOD = 500;
      tetris.start();

      // when
      tetris.refreshTick(NEW_TICK_PERIOD);
      // @ts-ignore
      const tick = jest.spyOn(tetris, "tick");
      jest.advanceTimersByTime(NEW_TICK_PERIOD * 4);

      // then
      expect(tick).toBeCalledTimes(4);
    });
  });

  it("키보드 조작은 ←, →, ↑, ↓, space 키로 할 수 있다.", () => {});

  describe("블락을 새로 넣을 수 있다.", () => {
    it("넣을 자리가 있을 때 블락은 매트릭스 위의 OO 위치를 갖게 된다...?", () => {});

    it("넣을 자리가 있을 때 블락의 OO 위치에서 좌상단의 cell의 위치는 rotation pivot 위치가 된다.", () => {});

    it("넣을 자리가 없으면 게임이 끝난다.", () => {});
  });

  describe("↑ 키를 누르면 블락을 회전시킨다.", () => {
    it("양 쪽에 회전할 공간이 있으면 블락을 시계 방향으로 회전시킨다.", () => {});

    it("왼쪽에 회전할 공간이 없는 경우는 없다.", () => {});

    describe("I 블락이 오른쪽에 회전할 공간이 없는 경우", () => {
      it("부족한 column의 너비가 3이고, 왼쪽으로 1칸 이동 가능하면 회전할 수 없다.", () => {});

      it("부족한 column의 너비가 2이고, 왼쪽으로 2칸 이동 가능하면 회전할 수 있다.", () => {});

      it("부족한 column의 너비가 2이고, 왼쪽으로 2칸 이동 가능하면 회전 후에도 rotation pivot은 그대로여야 한다.", () => {});

      it("이동 후 회전이 되더라도 원래 모양인 'I'로 돌아왔을 때는 'ㅡ'로 회전하기 전과 동일한 위치가 되어야 한다", () => {});
    });
  });

  it("space 키를 누르면 블락을 가장 아래로 이동시킨 후에 바로 고정시킬 수 있다.", () => {});

  it("블락이 타이머에 의해 아래로 이동될 때 자리가 없으면 그 자리에 고정된다.", () => {});

  it("블락이 ↓ 키에 의해 아래로 이동될 때 자리가 없으면 그 자리에 고정된다.", () => {});

  describe("'I' 블락이 고정되었을 때", () => {
    it("고정된 블락의 모든 줄에 수평선이 생기면 모든 수평선이 제거되고, 제거된 선 위 쪽의 고정된 블락들이 4칸 내려온다.", () => {});

    it("고정된 블락의 밑에서 1, 4번째 줄에서 수평선이 생기면 1번 째 수평선이 제거되고, 제거된 선 위 쪽의 고정된 블락들이 1칸 내려온다.", () => {});

    it("고정된 블락의 밑에서 1, 2, 4번째 줄에서 수평선이 생기면 1, 2번 째 수평선이 제거되고, 제거 된 선 위쪽의 고정된 블락들이 2칸 내려온다.", () => {});

    it("고정된 블락의 밑에서 2, 4번째 줄에서 수평선이 생기면 수평선이 제거되지 않는다.", () => {});
  });

  describe("'ㄱ' 블락이 고정되었을 때", () => {
    it("고정된 블락의 모든 줄에서 수평선이 생기면 모든 수평선이 제거되고, 제거된 선 위 쪽의 고정된 블락들이 2칸 내려 온다.", () => {});

    it("고정된 블락의 밑에서 1번 째 줄에서 수평선이 생기면 1번 째 수평선이 제거되고, 제거된 선 위 쪽의 고정된 블락들이 1칸 내려온다.", () => {});

    it("고정된 블락의 밑에서 2번 째 줄에서 수평선이 생기면 수평선이 제거되지 않는다.", () => {});
  });

  it("블락이 고정되면 타이머는 refresh 된다.", () => {});

  describe("수평선이 제거되었을 때 점수가 오른다.", () => {
    it("1개의 수평선이 제거되면 '현재 난이도 * 10'만큼 점수가 오른다.", () => {});

    it("4개의 수평선이 제거되면 '현재 난이도 * 40'만큼 점수가 오른다.", () => {});
  });

  describe("점수에 따라 난이도가 올라간다.", () => {
    it("현재 점수가 0이면, 난이도는 1이 된다.", () => {});

    it("현재 점수가 100점이면, 난이도는 1이 된다.", () => {});

    it("현재 점수가 101점이면, 난이도는 2가 된다.", () => {});

    it("현재 점수가 1000점이면, 난이도는 9가 된다.", () => {});

    it("현재 점수가 1001점이면, 난이도는 10이 된다.", () => {});

    it("현재 점수가 9999999점이면, 난이도는 10이 된다.", () => {});
  });

  describe("난이도에 따라 타이머의 주기가 달라진다. ", () => {
    it("난이도가 1이면 타이머의 주기는 처음보다 5% 짧아진다.", () => {});

    it("난이도가 4이면 타이머의 주기는 처음보다 20% 짧아진다.", () => {});

    it("난이도가 10이면 타이머의 주기는 처음보다 50% 짧아진다.", () => {});

    it("난이도가 20이면 타이머의 주기는 처음보다 50% 짧아진다.", () => {});
  });

  describe("테트리스가 끝난다. ", () => {
    it("테트리스가 끝나면 타이머가 종료된다.", () => {});

    it("테트리스가 끝나면 키보드 조작을 할 수 없다.", () => {});
  });
});
