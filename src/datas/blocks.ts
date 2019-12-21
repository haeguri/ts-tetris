import BlockType from "../enums/BlockType";
import Blocks from "../types/Blocks";

// prettier-ignore
const blocks: Blocks = {
  [BlockType.I]: [
    [1, 1, 1, 1],
  ],
  [BlockType.J]: [
    [0, 1],
    [0, 1],
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
