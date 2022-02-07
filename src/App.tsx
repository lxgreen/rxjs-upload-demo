import React, { useContext } from "react";
import LogViewer from "./components/LogViewer";
import Toaster from "./components/Toaster";
import ImageViewer from "./components/ImageViewer";
import { ServiceContext } from "./context/service-context";
import "./styles.css";

export default function App() {
  const { logger, notifier, uploader } = useContext(ServiceContext);
  let counter = 0;

  const logTestMessage = (message: string) => logger.log(message);
  const resetLog = () => logger.reset();
  const addInfo = (notification: string) => notifier.info(notification);
  const addError = (notification: string) => notifier.error(notification);
  const resetNotifier = () => notifier.removeAll();
  const upload = () => uploader.selectFiles();
  const removeImages = () => uploader.removeAll();

  return (
    <div className="App">
      <div className="content">
        <ImageViewer />
      </div>
      <div className="toaster">
        <Toaster />
      </div>
      <div className="footer">
        <button key="log" onClick={() => logTestMessage(`TEST ${++counter}`)}>
          LOG TEST MESSAGE
        </button>
        <button key="resetLog" onClick={resetLog}>
          CLEAR LOG
        </button>
        <button key="info" onClick={() => addInfo(`GOOD ${++counter}`)}>
          INFO
        </button>
        <button key="error" onClick={() => addError(`ERROR ${++counter}`)}>
          ERROR
        </button>
        <button key="resetNotify" onClick={resetNotifier}>
          CLEAR NOTIFICATIONS
        </button>
        <button key="uploadImage" onClick={upload}>
          UPLOAD IMAGES
        </button>
        <button key="cancelUploads" onClick={removeImages}>
          REMOVE IMAGES
        </button>
        <button key="noop">NOOP</button>
      </div>
      <div className="logger">
        <LogViewer />
      </div>
    </div>
  );
}
