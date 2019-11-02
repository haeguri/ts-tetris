import Matrix from "./Matrix";

describe("Matrix", () => {
  describe("initCells", () => {
    it("should set width, height", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      expect(matrix.width).toEqual(6);
      expect(matrix.height).toEqual(6);
    });

    it("should receive positive number", () => {
      try {
        new Matrix({ width: -1, height: 0 });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    it("should receive number as only even number", () => {
      try {
        new Matrix({ width: 5, height: 5 });
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    it("should make 6x6 matrix when width/height is 6.", () => {
      const matrix = new Matrix({ width: 6, height: 6 });
      matrix.initCells();
      expect(matrix.cells).toEqual([
        // prettier-ignore
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });
    // it("should ");
  });
});
