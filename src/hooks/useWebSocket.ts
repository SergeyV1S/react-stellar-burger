import { useCallback, useEffect, useRef } from "react";

export const CONNECTING = "CONNECTING" as const;
export const OPEN = "OPEN" as const;
export const CLOSING = "CLOSING" as const;
export const CLOSED = "CLOSED" as const;

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED
};

interface IWebSocketOptions {
  onMessage: (event: MessageEvent<string>) => void;
  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}

export const useWebSocket = (url: string, options: IWebSocketOptions) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (token: string) => {
      ws.current = new WebSocket(`${url}?token=${token}`);

      ws.current.onmessage = (event: MessageEvent<string>) => {
        if (typeof options.onMessage === "function") {
          options.onMessage(event);
        }
      };

      ws.current.onopen = (event: Event) => {
        if (typeof options.onConnect === "function") {
          options.onConnect(event);
        }
      };

      ws.current.onerror = (event: Event) => {
        if (typeof options.onError === "function") {
          options.onError(event);
        }
      };

      ws.current.onclose = (event: Event) => {
        if (typeof options.onDisconnect === "function") {
          options.onDisconnect(event);
        }
      };
    },
    [url, options]
  );

  useEffect(() => {
    if (ws.current) {
      if (typeof options.onConnect === "function") {
        ws.current.onopen = options.onConnect;
      }
      if (typeof options.onError === "function") {
        ws.current.onerror = options.onError;
      }
      if (typeof options.onMessage === "function") {
        ws.current.onmessage = options.onMessage;
      }
      if (typeof options.onDisconnect === "function") {
        ws.current.onclose = options.onDisconnect;
      }
    }
  }, [options, ws]);

  useEffect(
    () => () => {
      if (ws.current && typeof ws.current.close === "function") {
        ws.current.close();
      }
    },
    []
  );

  const sendData = useCallback(
    (message: object) => {
      if (ws.current) {
        ws.current.send(JSON.stringify(message));
      }
    },
    [ws]
  );

  return { connect, sendData };
};
