import React from "react";
import Logger from "../services/logger";
import NotificationFactory from "../services/notification-factory";
import Notifier from "../services/notifier";
import FileUploader from "../services/file-uploader";
import { ImageFactory } from "../services/image-factory";
import ImageContentManager from "../services/image-manager";

const logger = new Logger();
const notifier = new Notifier(new NotificationFactory(), logger);
const uploader = new FileUploader(notifier, logger);
const imageManager = new ImageContentManager(new ImageFactory());

console.log("Services created: logger, notifier, uploader, imageManager");

export const ServiceContext = React.createContext({
  logger,
  notifier,
  uploader,
  imageManager
});
