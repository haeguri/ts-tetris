import Matrix from "./Matrix";
import Block from "./Block";
import BlockType from "enums/BlockType";

export default class Tetris {
  readonly matrix: Matrix;

  constructor(width: number, height: number) {
    this.matrix = new Matrix({ width, height });
  }
}
