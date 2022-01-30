import React from "react";
import Logger from "../services/logger";
import Notifier from "../services/notifier";

const logger = new Logger();
const notifier = new Notifier();

console.log("Services created: logger, notifier");

export const ServiceContext = React.createContext({ logger, notifier });
