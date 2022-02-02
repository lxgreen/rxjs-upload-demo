import { Observable } from "rxjs";
import {
  FileUpload,
  IUploadRequestOptions,
  Uploader,
  UploaderError
} from "rxjs-uploader";
import { LogService, NotificationService, UploadService } from "../models";

const key = "5552fcb0c28873d48c9671855b70460e";

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
    },
    requestOptions: async (fileUpload: FileUpload) => {
      const formData = new FormData();
      formData.append("image", fileUpload.name);
      const requestOptions: IUploadRequestOptions = {
        url: `https://run.mocky.io/v3/04825bd6-734e-4219-a02a-0fb25fbfe8a8`,
        headers: {
          "content-length": `${fileUpload.file.size}`
        },
        formData
      };
      return requestOptions;
    },
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
      this.notifier.info(fileUpload.name + " was uploaded");
      console.log("response", fileUpload.responseBody);
      return fileUpload;
    },
    allFilesUploadedCallback: (fileUploads) => {
      this.notifier.info(fileUploads.length + " files were uploaded");
    },
    disallowedContentTypeErrorMessage: (file) => {
      const message = `${file.name} is an unsupported file type: ${file.type}`;
      this.notifier.warn(message);
      return message;
    },
    disallowedContentSizeErrorMessage: (file) => {
      const message = `${file.name} exceeds the limit (1MB)`;
      this.notifier.warn(message);
      return message;
    }
  });

  constructor(notifier: NotificationService, logger: LogService) {
    this.notifier = notifier;
    this.logger = logger;
  }

  // Stream API
  public fileUploadsStream: Observable<FileUpload[]>;
  public uploadErrorStream: Observable<UploaderError>;

  // should be called on DOM ready, before usage
  public initializeStreams(): void {
    this.fileUploadsStream = this.uploader.streamFileUploads(
      this.hiddenFileInput
    );
    this.uploadErrorStream = this.uploader.errorStream;
  }

  public selectFiles(): void {
    this.hiddenFileInput.click();
  }

  public cancelAll() {
    this.uploader.clear();
  }
}
