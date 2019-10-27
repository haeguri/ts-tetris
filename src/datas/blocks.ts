import BlockType from "../enums/BlockType";

type Block = {
  [key in BlockType]: Array<number[]>;
};

// prettier-ignore
const blocks: Block = {
  [BlockType.I]: [
    [1, 1, 1, 1]
  ],
  [BlockType.J]: [
    [0, 1], // [0, 0, 1]
    [0, 1], // [1, 1, 1]
    [1, 1],
  ],
  [BlockType.L]: [
    [1],
    [1],
    [1, 1],
  ],
  [BlockType.O]: [
    [1, 1],
    [1, 1]
  ],
  [BlockType.S]: [
    [0, 1, 1],
    [1, 1],
  ],
  [BlockType.T]: [
    [1, 1, 1],
    [0, 1],
  ],
  [BlockType.Z]: [
    [1, 1],
    [0, 1, 1]
  ]
};

export default blocks;
