import { Observable } from "rxjs";
import { FileUpload, Uploader, UploaderError } from "rxjs-uploader";
import { LogService, NotificationService, UploadService } from "../models";

// based on https://github.com/lsqlabs/rxjs-uploader#advanced-example-using-angular
export default class FileUploader implements UploadService {
  private notifier: NotificationService;
  private logger: LogService;
  private hiddenFileInput = Uploader.createFileInputElement("multiple");

  // TODO: should be customizable
  private uploader = new Uploader({
    allowedContentTypes: ["image/jpeg", "image/png"],
    fileCountLimit: 3,
    fileSizeLimitMb: 1,
    uploadFileAsBody: false,
    onFileCountLimitExceeded: (fileCountLimit) => {
      this.notifier.warn("too much files, max 3 at a time");
      this.logger.log("too much files, max 3 at a time");
    },
    requestOptions: (fileUpload) =>
      Promise.resolve({
        url:
          "https://www.mocky.io/v2/5185415ba171ea3a00704eed/" + fileUpload.name,
        headers: {
          "content-length": `${fileUpload.file.size}`
        }
      }),
    // optional step
    allFilesQueuedCallback: (fileUploads) => {
      return new Promise((resolve, reject) => {
        // Simulating an HTTP call.
        setTimeout(() => {
          this.logger.log(fileUploads.length + " files are ready to upload");
          resolve(fileUploads);
        }, 100);
      });
    },
    fileUploadedCallback: (fileUpload) => {
      this.logger.log(fileUpload.name + " was uploaded");
      return fileUpload;
    },
    allFilesUploadedCallback: (fileUploads) => {
      this.notifier.info(fileUploads.length + " files were uploaded");
      this.logger.log(fileUploads.length + " files were uploaded");
    },
    disallowedContentTypeErrorMessage: (file) => {
      const message = `${file.name} is an unsupported file type: ${file.type}`;
      this.notifier.warn(message);
      this.logger.log(message);
      return message;
    },
    disallowedContentSizeErrorMessage: (file) => {
      const message = `${file.name} exceeds the limit (1MB)`;
      this.notifier.warn(message);
      this.logger.log(message);
      return message;
    }
  });

  constructor(notifier: NotificationService, logger: LogService) {
    this.notifier = notifier;
    this.logger = logger;
  }

  // Stream API
  public fileUploads$: Observable<FileUpload[]>;
  public uploadErrors$: Observable<UploaderError>;

  // should be called before usage
  public initializeStream(): void {
    this.fileUploads$ = this.uploader.streamFileUploads(this.hiddenFileInput);
    this.uploadErrors$ = this.uploader.errorStream;
  }

  public selectFiles(): void {
    this.uploader.selectFiles();
  }

  public cancelAll() {
    this.uploader.clear();
  }
}
