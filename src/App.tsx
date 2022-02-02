import React, { useContext, useEffect } from "react";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import LogViewer from "./components/LogViewer";
import Toaster from "./components/Toaster";
import { ServiceContext } from "./context/service-context";
import { LogService, NotificationService } from "./models";
import "./styles.css";

const logTestMessage = (logger: LogService) => (message: string) =>
  logger.log(message);
const resetLog = (logger: LogService) => () => logger.reset();

const addInfo = (notifier: NotificationService) => (notification: string) =>
  notifier.info(notification);

const addError = (notifier: NotificationService) => (notification: string) =>
  notifier.error(notification);

const resetNotifier = (notifier: NotificationService) => () =>
  notifier.removeAll();

export default function App() {
  const { logger, notifier, uploader } = useContext(ServiceContext);
  let counter = 0;

  useEffect(() => {
    uploader.initializeStreams();
    const errors$ = uploader.uploadErrorStream.pipe(
      tap((e) => logger.log(`Upload error: ${e.message}`))
    );

    const subscription = merge(uploader.fileUploadsStream, errors$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <div className="App">
      <div className="content" />
      <div className="toaster">
        <Toaster />
      </div>
      <div className="footer">
        <button
          key="log"
          onClick={() => logTestMessage(logger)(`TEST ${++counter}`)}
        >
          LOG TEST MESSAGE
        </button>
        <button key="resetLog" onClick={resetLog(logger)}>
          CLEAR LOG
        </button>
        <button
          key="info"
          onClick={() => addInfo(notifier)(`GOOD ${++counter}`)}
        >
          INFO
        </button>
        <button
          key="error"
          onClick={() => addError(notifier)(`ERROR ${++counter}`)}
        >
          ERROR
        </button>
        <button key="resetNotify" onClick={resetNotifier(notifier)}>
          CLEAR NOTIFICATIONS
        </button>
        <button key="uploadImage" onClick={() => uploader.selectFiles()}>
          UPLOAD
        </button>
        <button key="addImageToContent">NOOP</button>
        <button key="failUploadImage">NOOP</button>
      </div>
      <div className="logger">
        <LogViewer />
      </div>
    </div>
  );
}
