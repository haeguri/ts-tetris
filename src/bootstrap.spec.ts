import bootstrap from "./bootstrap";
import Game from "./Game";

describe("bootstrap", () => {
  it("it should call showMain function", () => {
    const spiedFn = jest.spyOn(Game.prototype, "initialize");

    bootstrap();
    expect(spiedFn).toBeCalled();
  });
});
