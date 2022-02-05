import { Observable, Subject } from "rxjs";
import {
  FileUpload,
  IUploadRequestOptions,
  Uploader,
  UploaderError
} from "rxjs-uploader";
import { LogService, NotificationService, UploadService } from "../models";

// based on https://github.com/lsqlabs/rxjs-uploader#advanced-example-using-angular
export default class FileUploader implements UploadService {
  private notifier: NotificationService;
  private logger: LogService;
  private hiddenFileInput: HTMLInputElement;
  private _reset$ = new Subject<void>();

  // TODO: should be customizable
  private uploader = new Uploader({
    allowedContentTypes: ["image/jpeg", "image/png"],
    fileCountLimit: 12,
    fileSizeLimitMb: 5,
    uploadFileAsBody: false,
    onFileCountLimitExceeded: (fileCountLimit) => {
      this.notifier.warn(`too much files, max ${fileCountLimit} at a time`);
    },
    requestOptions: async (fileUpload: FileUpload) => {
      const formData = new FormData();
      formData.append("image", fileUpload.name);
      const requestOptions: IUploadRequestOptions = {
        url: `https://run.mocky.io/v3/10b4731f-3915-4b70-b0ff-3c5c30bbd3d2`,
        headers: {
          "content-length": `${fileUpload.file.size}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept"
        },
        formData
      };
      return requestOptions;
    },
    // optional step
    allFilesQueuedCallback: (fileUploads) =>
      this.logger.log(fileUploads.length + " files are ready to upload"),
    allFilesUploadedCallback: (fileUploads) => {
      this.notifier.info(fileUploads.length + " files were uploaded");
    },
    disallowedContentTypeErrorMessage: (file) =>
      `${file.name} is an unsupported file type: ${file.type}`,
    disallowedContentSizeErrorMessage: (file) =>
      `${file.name} exceeds the limit (5MB)`
  });

  constructor(notifier: NotificationService, logger: LogService) {
    this.notifier = notifier;
    this.logger = logger;
  }

  // Stream API
  public fileUploadsStream: Observable<FileUpload[]>;
  public uploadErrorStream: Observable<UploaderError>;
  public onRemoveAll = this._reset$.asObservable();
  public isReady = false;
  public onComplete = (fileUpload: FileUpload) => FileUpload;

  // should be called on DOM ready, before usage
  public initializeStream(
    onComplete: (fileUpload: FileUpload) => FileUpload
  ): void {
    if (!this.isReady) {
      this.isReady = true;
      this.hiddenFileInput = Uploader.createFileInputElement("multiple");
      this.fileUploadsStream = this.uploader.streamFileUploads(
        this.hiddenFileInput
      );
      this.uploadErrorStream = this.uploader.errorStream;
      this.uploader.setFileUploadedCallback(onComplete);
      this.logger.log("uploader is ready for use");
    }
  }

  public selectFiles(): void {
    this.hiddenFileInput.click();
  }

  public removeAll() {
    this.uploader.clear();
    this._reset$.next();
  }
}
