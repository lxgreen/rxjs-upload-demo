import React from "react";
import Logger from "../services/logger";
import NotificationFactory from "../services/notification-factory";
import Notifier from "../services/notifier";
import FileUploader from "../services/file-uploader";

const logger = new Logger();
const factory = new NotificationFactory();
const notifier = new Notifier(factory, logger);
const uploader = new FileUploader(notifier, logger);

console.log("Services created: logger, notifier, uploader");

export const ServiceContext = React.createContext({
  logger,
  notifier,
  uploader
});
