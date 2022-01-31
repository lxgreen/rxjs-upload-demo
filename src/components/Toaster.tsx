import React, { FC, useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { Notification } from "../models";
import { ServiceContext } from "../context/service-context";

const Toaster: FC = () => {
  const { logger, notifier } = useContext(ServiceContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const data$ = notifier.notificationAdded$.pipe(
      tap({
        next: (notification: Notification) => {
          setNotifications([notification, ...notifications]);
          logger.log(`'${notification.level}' notification added`);
        }
      })
    );
    const reset$ = notifier.reset$.pipe(
      tap({
        next: () => {
          setNotifications([]);
          logger.log("notifications reset");
        }
      })
    );

    const subscription = merge(data$, reset$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [notifier, logger, notifications]);

  return (
    <>
      {notifications.length > 0
        ? notifications.map((d, i) => (
            <div key={i} className={`toast ${d.level}`}>
              {d.message}
            </div>
          ))
        : null}
    </>
  );
};

export default Toaster;
