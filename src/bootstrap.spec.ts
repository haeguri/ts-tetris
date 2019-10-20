import bootstrap from "./bootstrap";
import Game from "./Game";

describe("bootstrap", () => {
  it("it should call initialize method of Game", () => {
    const fn = jest.spyOn(Game.prototype, "initialize");
    bootstrap();
    expect(fn).toBeCalled();
  });
});
