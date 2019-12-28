import BlockType from "enums/BlockType";
import Cells from "./Cells";

type Blocks = {
  [key in BlockType]: Cells;
};

export default Blocks;
