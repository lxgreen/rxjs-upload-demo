import React, { useContext } from "react";
import LogViewer from "./components/LogViewer";
import { ServiceContext } from "./context/service-context";
import Logger from "./services/logger";
import "./styles.css";

const logTestMessage = (logger: Logger) => (message: string) =>
  logger.log(message);
const resetLog = (logger: Logger) => () => logger.reset();

export default function App() {
  const { logger } = useContext(ServiceContext);
  return (
    <div className="App">
      <div className="content" />
      <div className="toaster" />
      <div className="footer">
        <button onClick={() => logTestMessage(logger)("TEST MESSAGE")}>
          LOG TEST MESSAGE
        </button>
        <button onClick={() => resetLog(logger)()}>CLEAR LOG</button>
        <button>NOOP</button>
        <button>NOOP</button>
        <button>NOOP</button>
        <button>NOOP</button>
        <button>NOOP</button>
        <button>NOOP</button>
      </div>
      <div className="logger">
        <LogViewer />
      </div>
    </div>
  );
}
