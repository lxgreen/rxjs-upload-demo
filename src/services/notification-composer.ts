import { Observable, Subject } from "rxjs";
import { bufferTime } from "rxjs/operators";
import { NotificationService, Notification } from "../models";
import NotificationFactory from "./notification-factory";

export default class NotificationComposer implements NotificationService {
  private notifier: NotificationService;
  private factory: NotificationFactory;
  private onNotificationAdded$ = new Subject<Notification>();
  public readonly onNotificationAdded;
  public readonly onRemoveAll: Observable<void>;
  public readonly onNotificationRemoved: Observable<Notification>;

  private notifyBulk(
    notifications: Notification[],
    type: Notification["level"]
  ) {
    const messages = notifications.map((n) => n.message);
    if (messages.length > 1) {
      this.onNotificationAdded$.next(
        this.factory[type](
          `${messages.length} ${type}s: ${messages.join(", ")}`,
          5
        )
      );
    } else if (messages.length === 1)
      this.onNotificationAdded$.next(this.factory[type](messages[0]));
  }

  constructor(notifier: NotificationService, factory: NotificationFactory) {
    this.factory = factory;
    this.notifier = notifier;
    this.onRemoveAll = this.notifier.onRemoveAll;
    this.onNotificationRemoved = this.notifier.onNotificationRemoved;

    const buffered = this.notifier.onNotificationAdded.pipe(bufferTime(1000));
    buffered.subscribe((notifications) => {
      this.notifyBulk(
        notifications.filter((n) => n.level === "error"),
        "error"
      );
      this.notifyBulk(
        notifications.filter((n) => n.level === "warn"),
        "warn"
      );
      this.notifyBulk(
        notifications.filter((n) => n.level === "info"),
        "info"
      );
    });
    this.onNotificationAdded = this.onNotificationAdded$.asObservable();
  }

  public removeAll = () => {
    this.notifier.removeAll();
  };

  public removeNotification(notification: Notification) {
    this.notifier.removeNotification(notification);
  }

  public info(message: string): void {
    this.notifier.info(message);
  }

  public warn(message: string): void {
    this.notifier.warn(message);
  }

  public error(message: string): void {
    this.notifier.error(message);
  }
}
