import React, { FC } from "react";
import { ImageUpload } from "../models";

type ImageProps = {
  upload: ImageUpload;
};

const Image: FC<ImageProps> = ({ upload }) => {
  return <div className={`image ${upload.status}`}>{upload.status}</div>;
};

export default Image;
