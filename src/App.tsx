import React, { useContext } from "react";
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

const resetNotifier = (notifier: NotificationService) => () => notifier.reset();

export default function App() {
  const { logger, notifier } = useContext(ServiceContext);
  return (
    <div className="App">
      <div className="content" />
      <div className="toaster">
        <Toaster />
      </div>
      <div className="footer">
        <button
          key="log"
          onClick={() => logTestMessage(logger)("TEST MESSAGE")}
        >
          LOG TEST MESSAGE
        </button>
        <button key="resetLog" onClick={resetLog(logger)}>
          CLEAR LOG
        </button>
        <button key="info" onClick={() => addInfo(notifier)("All's good man!")}>
          INFO
        </button>
        <button key="error" onClick={() => addError(notifier)("ERROR")}>
          ERROR
        </button>
        <button key="resetNotify" onClick={resetNotifier(notifier)}>
          RESET NOTIFICATIONS
        </button>
        <button key="uploadImage">NOOP</button>
        <button key="failUploadImage">NOOP</button>
        <button key="addImageToContent">NOOP</button>
      </div>
      <div className="logger">
        <LogViewer />
      </div>
    </div>
  );
}
