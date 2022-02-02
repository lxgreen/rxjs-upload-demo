import React, { FC, useContext, useEffect, useState } from "react";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { ServiceContext } from "../context/service-context";

const LogViewer: FC = () => {
  const { logger } = useContext(ServiceContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const messages$ = logger.onMessageLogged.pipe(
      tap({
        next: (message) => {
          setData([`[${new Date().toLocaleTimeString()}] ${message}`, ...data]);
        }
      })
    );
    const reset$ = logger.onReset.pipe(
      tap({
        next: () => {
          setData([]);
        }
      })
    );

    const subscription = merge(messages$, reset$).subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [logger, data]);

  return (
    <>
      {data.length > 0 ? (
        data.map((d, i) => <div key={i}>{d}</div>)
      ) : (
        <div>-- empty log --</div>
      )}
    </>
  );
};

export default LogViewer;
