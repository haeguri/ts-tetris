import Matrix from "./Matrix";

interface TetrisSetting {
  width: number;
  height: number;
  initialTickPeriod: number;
}

export default class Tetris {
  readonly matrix: Matrix;

  private initialTickPeriod: number;
  private tickId?: number;

  constructor({ width, height, initialTickPeriod }: TetrisSetting) {
    this.matrix = new Matrix({ width, height });
    this.initialTickPeriod = initialTickPeriod;
  }

  get isTickStarted() {
    return this.tickId > 0;
  }

  public start() {
    this.tickId = (setInterval(() => {},
    this.initialTickPeriod) as unknown) as number;
  }
}
