import React from "react";
import Logger from "../services/logger";
import NotificationFactory from "../services/notification-factory";
import Notifier from "../services/notifier";
import FileUploader from "../services/file-uploader";
import NotificationComposer from "../services/notification-composer";

const logger = new Logger();
const notifier = new Notifier(new NotificationFactory(), logger);
const uploader = new FileUploader(notifier, logger);
const notificationComposer = new NotificationComposer(
  notifier,
  new NotificationFactory()
);

console.log("Services created: logger, notifier, uploader, imageManager");

export const ServiceContext = React.createContext({
  logger,
  notifier,
  uploader,
  notificationComposer
});
