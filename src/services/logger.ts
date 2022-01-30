import { Subject } from "rxjs";
import { LogService } from "../models";

class Logger implements LogService {
  private _reset$ = new Subject<void>();
  private _messageLogged$ = new Subject<string>();

  // Stream APIs
  public readonly reset$ = this._reset$.asObservable();
  public readonly messageLogged$ = this._messageLogged$.asObservable();

  // Method APIs
  public reset = () => {
    this._reset$.next();
  };
  public log = (message: string) => {
    this._messageLogged$.next(message);
  };
}

export default Logger;
