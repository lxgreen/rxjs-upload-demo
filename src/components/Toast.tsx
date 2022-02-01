import React, { FC } from "react";

import { Notification } from "../models";

type ToastProps = {
  notification: Notification;
};

const Toast: FC<ToastProps> = ({ notification }) => {
  return (
    <div className={`added toast ${notification.level}`}>
      {notification.message}
    </div>
  );
};

export default Toast;
