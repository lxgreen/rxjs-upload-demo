import { Notification } from "../models";
import { v4 as uuid } from "uuid";

export default class NotificationFactory {
  public info(message: string, expiry: number = 2): Notification {
    return { level: "info", message, expiry, id: uuid() };
  }

  public error(message: string, expiry: number = 3): Notification {
    return { level: "error", message, expiry, id: uuid() };
  }

  public warn(message: string, expiry: number = 2): Notification {
    return { level: "warn", message, expiry, id: uuid() };
  }
}
