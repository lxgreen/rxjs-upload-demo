import React, { useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { ServiceContext } from "../context/service-context";

const LogViewer = () => {
  const { logger } = useContext(ServiceContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const data$ = logger.messageLogged$.pipe(
      tap({
        next: (message) => {
          setData([`[${new Date().toLocaleTimeString()}] ${message}`, ...data]);
        }
      })
    );
    const reset$ = logger.reset$.pipe(
      tap({
        next: () => {
          setData([]);
        }
      })
    );

    const subscription = merge(data$, reset$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [logger, data]);

  return data.length > 0 ? (
    data.map((d) => <div>{d}</div>)
  ) : (
    <div>-- empty log --</div>
  );
};

export default LogViewer;