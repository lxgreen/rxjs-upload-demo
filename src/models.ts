import { ImageNode } from "ricos-content";
import { Observable } from "rxjs";
import { FileUpload, UploaderError } from "rxjs-uploader";

export interface LogService {
  log(message: string): void;
  reset(): void;
  messageLogged$: Observable<string>;
  reset$: Observable<void>;
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
  removeAll$: Observable<void>;
  notificationAdded$: Observable<Notification>;
  notificationRemoved$: Observable<Notification>;
}

export interface UploadService {
  selectFiles(): void;
  cancelAll(): void;
  initializeStream(): void;
  fileUploads$: Observable<FileUpload[]>;
  uploadErrors$: Observable<UploaderError>;
}

export interface ImageService {
  addImage(data: ImageNode["imageData"]): void;
  updateImage(node: ImageNode): void;
  removeImage(node: ImageNode): void;
}
