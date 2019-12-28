import Matrix from "./Matrix";

export default class Tetris {
  readonly matrix: Matrix;

  constructor(width: number, height: number) {
    this.matrix = new Matrix({ width, height });
  }
}
