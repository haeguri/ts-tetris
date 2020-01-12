export default (cells: number[][]) => {
  let result = ``;

  cells.forEach(row => {
    row.forEach(col => {
      result += col;
    });

    result += "\n";
  });

  return result;
};
