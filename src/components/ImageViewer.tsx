import React, { FC, useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap, map } from "rxjs/operators";
import { ServiceContext } from "../context/service-context";
import { ImageUpload } from "../models";
import Image from "./Image";
import { ImageData } from "ricos-schema";
import { FileUpload } from "rxjs-uploader";
import { pipe, flow } from "fp-ts/function";
import * as A from "fp-ts/Array";

const toImageData = (url: string): ImageData => ({
  image: { src: { url }, width: 0, height: 0 }
});

const toImageUpload = (u: FileUpload): ImageUpload =>
  u.failed
    ? { status: "FAILED" }
    : u.succeeded
    ? { status: "COMPLETE", data: toImageData(u.responseBody.src) }
    : { status: "PROGRESS", progress: u.progressPercentage };

const ImageViewer: FC = () => {
  const { uploader, imageManager } = useContext(ServiceContext);

  const [images, setImages] = useState<ImageUpload[]>([]);

  useEffect(() => {
    const images$ = uploader.fileUploadsStream.pipe(
      tap(flow(A.map(toImageUpload), setImages))
    );

    const subscription = images$.subscribe();

    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <>
      {images.length > 0
        ? images.map((n, i) => <Image upload={n} key={i} />)
        : null}
    </>
  );
};

export default ImageViewer;
