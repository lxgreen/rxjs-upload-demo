import { Subject } from "rxjs";
import { NotificationService, Notification } from "../models";

export default class Notifier implements NotificationService {
  private _reset$ = new Subject<void>();
  private _notificationAdded$ = new Subject<Notification>();

  // Stream APIs
  public readonly reset$ = this._reset$.asObservable();
  public readonly notificationAdded$ = this._notificationAdded$.asObservable();

  // Method APIs
  public reset = () => {
    this._reset$.next();
  };

  public info(message: string): void {
    this._notificationAdded$.next({ level: "info", message });
  }

  public warn(message: string): void {
    this._notificationAdded$.next({ level: "warn", message });
  }

  public error(message: string): void {
    this._notificationAdded$.next({ level: "error", message });
  }
}
