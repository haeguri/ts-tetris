import Matrix from "./Matrix";

describe("Matrix", () => {
  describe("initCells", () => {
    it("should make 5x5 matrix when width/height is 5.", () => {
      const matrix = new Matrix({ width: 5, height: 5 });
      matrix.initCells();
      expect(matrix.cells).toEqual([
        // prettier-ignore
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });
  });
});
