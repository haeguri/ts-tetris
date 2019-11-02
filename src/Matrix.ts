interface ConstructorParams {
  width: number;
  height: number;
}

export default class Matrix {
  public width: number;
  public height: number;
  public cells: number[][];

  constructor({ width, height }: ConstructorParams) {
    this.width = width;
    this.height = height;
  }

  public initCells() {
    this.cells = Array.from<number[]>({ length: 5 }).map(_ =>
      Array.from<number>({ length: 5 }).fill(0)
    );
  }
}
