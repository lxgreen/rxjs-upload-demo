import React, { FC, useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { Notification } from "../models";
import { ServiceContext } from "../context/service-context";
import Toast from "./Toast";

const Toaster: FC = () => {
  const { notifier } = useContext(ServiceContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const notifications$ = notifier.notificationAdded$.pipe(
      tap({
        next: (notification: Notification) => {
          setNotifications([...notifications, notification]);
          setTimeout(
            () => notifier.removeNotification(notification),
            notification.expiry * 1000
          );
        }
      })
    );
    const reset$ = notifier.removeAll$.pipe(
      tap({
        next: () => {
          setNotifications([]);
        }
      })
    );
    const removed$ = notifier.notificationRemoved$.pipe(
      tap({
        next: (notification) =>
          setNotifications(
            notifications.filter((n) => n.id !== notification.id)
          )
      })
    );

    const subscription = merge(notifications$, reset$, removed$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <>
      {notifications.length > 0
        ? notifications.map((n, i) => <Toast notification={n} key={i} />)
        : null}
    </>
  );
};

export default Toaster;
