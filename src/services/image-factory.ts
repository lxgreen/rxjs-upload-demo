import type { ImageNode } from "ricos-content";
import { Node_Type } from "ricos-schema";
import { v4 as uuid } from "uuid";

export class ImageFactory {
  public create(data: ImageNode["imageData"]): ImageNode {
    return {
      id: uuid(),
      nodes: [],
      imageData: data,
      type: Node_Type.IMAGE
    };
  }
}
