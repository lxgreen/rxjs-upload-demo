import React from "react";
import Logger from "../services/logger";
import NotificationFactory from "../services/notification-factory";
import Notifier from "../services/notifier";

const logger = new Logger();
const factory = new NotificationFactory();
const notifier = new Notifier(factory, logger);

console.log("Services created: logger, notifier");

export const ServiceContext = React.createContext({
  logger,
  notifier
});
