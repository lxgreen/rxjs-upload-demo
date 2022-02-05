import React, { useContext, FC } from "react";
import LogViewer from "./components/LogViewer";
import Toaster from "./components/Toaster";
import ImageViewer from "./components/ImageViewer";
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

export default function App(): FC {
  const { logger, notifier, uploader } = useContext(ServiceContext);
  let counter = 0;

  return (
    <div className="App">
      <div className="content">
        <ImageViewer />
      </div>
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
          UPLOAD IMAGES
        </button>
        <button key="cancelUploads" onClick={() => uploader.removeAll()}>
          REMOVE IMAGES
        </button>
        <button key="failUploadImage">NOOP</button>
      </div>
      <div className="logger">
        <LogViewer />
      </div>
    </div>
  );
}
