import Matrix from "./Matrix";

export default class Game {
  private matrix: Matrix;

  constructor() {
    this.matrix = new Matrix({ width: 5, height: 5 });
  }
}
