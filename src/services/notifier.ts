import { Subject } from "rxjs";
import { NotificationService, Notification, LogService } from "../models";
import NotificationFactory from "./notification-factory";

export default class Notifier implements NotificationService {
  private _removeAll$ = new Subject<void>();
  private _notificationAdded$ = new Subject<Notification>();
  private _notificationRemoved$ = new Subject<Notification>();
  private factory: NotificationFactory;
  private logger: LogService;

  constructor(factory: NotificationFactory, logger: LogService) {
    this.factory = factory;
    this.logger = logger;
  }

  // Stream APIs
  public readonly removeAll$ = this._removeAll$.asObservable();
  public readonly notificationAdded$ = this._notificationAdded$.asObservable();
  public readonly notificationRemoved$ = this._notificationRemoved$.asObservable();

  // Method APIs
  public removeAll = () => {
    this._removeAll$.next();
    this.logger.log("all notifications removed");
  };

  public removeNotification(notification: Notification) {
    this._notificationRemoved$.next(notification);
    this.logger.log(`notification "${notification.message}" removed`);
  }

  public info(message: string): void {
    this._notificationAdded$.next(this.factory.info(message));
    this.logger.log("info notification added");
  }

  public warn(message: string): void {
    this._notificationAdded$.next(this.factory.warn(message));
    this.logger.log("warn notification added");
  }

  public error(message: string): void {
    this._notificationAdded$.next(this.factory.error(message));
    this.logger.log("error notification added");
  }
}
