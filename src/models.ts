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
  warn(message: string): void;
  error(message: string): void;
  removeAll(): void;
  removeNotification(notification: Notification): void;
  onRemoveAll: Observable<void>;
  onNotificationAdded: Observable<Notification>;
  onNotificationRemoved: Observable<Notification>;
}

export interface UploadService {
  selectFiles(): void;
  removeAll(): void;
  fileUploadsStream: Observable<FileUpload[]>;
  uploadErrorStream: Observable<UploaderError>;
  onRemoveAll: Observable<void>;
}

export type ImageUpload =
  | {
      status: "COMPLETE";
      data: ImageData;
      id: string;
    }
  | {
      status: "PROGRESS";
      progress: number;
      data: ImageData;
      id: string;
    }
  | {
      status: "FAILED";
      data: ImageData;
      id: string;
    };
