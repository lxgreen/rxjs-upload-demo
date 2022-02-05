import React, { FC } from "react";
import { ImageUpload } from "../models";

type ImageProps = {
  upload: ImageUpload;
};

const Image: FC<ImageProps> = ({ upload }) => {
  return (
    <div
      className={`image ${upload.status.toLocaleLowerCase()}`}
      title={upload.id}
    >
      <img src={upload.data.image.src.url} alt={"random unsplash"} />
      {upload.status === "PROGRESS" && <div>{upload.progress + "%"}</div>}
      {upload.status === "FAILED" && <div>{"FAILED!"}</div>}
    </div>
  );
};

export default Image;
