import React, { FC, useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap, map } from "rxjs/operators";
import { ServiceContext } from "../context/service-context";
import { ImageUpload } from "../models";
import Image from "./Image";
import { ImageData } from "ricos-schema";
import { FileUpload } from "rxjs-uploader";
import * as A from "fp-ts/lib/Array";

const PREVIEW_IMAGE =
  " data:image/png;base64,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";

const toImageData = (url: string): ImageData => ({
  image: { src: { url }, width: 0, height: 0 }
});

const toImageUpload = (u: FileUpload): ImageUpload =>
  u.failed
    ? { status: "FAILED", data: toImageData(PREVIEW_IMAGE), id: u.name }
    : u.succeeded
    ? { status: "COMPLETE", data: toImageData(u.responseBody.src), id: u.name }
    : {
        status: "PROGRESS",
        progress: u.progressPercentage,
        data: toImageData(PREVIEW_IMAGE),
        id: u.name
      };

const ImageViewer: FC = () => {
  const { uploader, notifier } = useContext(ServiceContext);

  const [images, setImages] = useState<Record<string, ImageUpload>>({});
  const setImagesLog = (images: Record<string, ImageUpload>) => {
    console.dir(images);
    setImages(images);
  };

  useEffect(() => {
    const onComplete = (upload: FileUpload) => {
      const image = toImageUpload(upload);
      setImagesLog({ ...images, [image.id]: image });
      return upload;
    };

    if (!uploader.isReady) {
      uploader.initializeStream(onComplete);
    }

    const images$ = uploader.fileUploadsStream.pipe(map(A.map(toImageUpload)));

    const cancellAll$ = uploader.onRemoveAll.pipe(
      tap(() => {
        setImagesLog({});
        notifier.warn("All images removed");
      })
    );

    const errors$ = uploader.uploadErrorStream.pipe(
      tap((e) => notifier.error(`Upload error: ${e.message}`))
    );

    const subscription = merge(errors$, cancellAll$).subscribe();
    const imagesSub = images$.subscribe((uploads) => {
      const uploadMap = uploads.reduce(
        (map, up) => ({ ...map, [up.id]: up }),
        {}
      );
      setImagesLog({ ...images, ...uploadMap });
    });

    return () => {
      subscription.unsubscribe();
      imagesSub.unsubscribe();
    };
  }, [uploader, notifier]);

  return (
    <>
      {Object.values(images).length > 0
        ? Object.values(images).map((n, i) => <Image upload={n} key={i} />)
        : null}
    </>
  );
};

export default ImageViewer;
