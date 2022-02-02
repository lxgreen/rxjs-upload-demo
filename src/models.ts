import { ImageNode } from "ricos-content";
import { ImageData } from "ricos-schema";
import { Observable } from "rxjs";
import { FileUpload, UploaderError } from "rxjs-uploader";

export interface LogService {
  log(message: string): void;
  reset(): void;
  onMessageLogged: Observable<string>;
  onReset: Observable<void>;
}

export type Notification = {
  level: "error" | "info" | "warn";
  message: string;
  expiry: number;
  id: string;
};

export interface NotificationService {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
  removeAll(): void;
  removeNotification(notification: Notification);
  onRemoveAll: Observable<void>;
  onNotificationAdded: Observable<Notification>;
  onNotificationRemoved: Observable<Notification>;
}

export interface UploadService {
  selectFiles(): void;
  cancelAll(): void;
  initializeStreams(): void;
  fileUploadsStream: Observable<FileUpload[]>;
  uploadErrorStream: Observable<UploaderError>;
}

export type ImageUpload =
  | {
      status: "COMPLETE";
      data: ImageData;
    }
  | {
      status: "PROGRESS";
      progress: number;
    }
  | {
      status: "FAILED";
    };

export interface ImageContentService {
  addImage(data: ImageData): void;
  updateImage(node: ImageNode): void;
  removeImage(node: ImageNode): void;
  onImageAdded: Observable<ImageNode>;
  onImageUpdated: Observable<ImageNode>;
  onImageRemoved: Observable<ImageNode>;
}
