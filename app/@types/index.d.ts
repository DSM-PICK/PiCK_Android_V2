declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.pdf" {
  const value: any;
  export default value;
}

declare module "react-native-websocket" {
  export interface WebSocketOptions {
    headers?: { [headerName: string]: string };
    protocols?: string | string[];
    [optionName: string]: any;
  }

  export class WebSocket {
    constructor(url: string, options?: WebSocketOptions);
    send(data: string | ArrayBuffer | Blob): void;
    close(code?: number, reason?: string): void;
    onopen: (() => void) | null;
    onmessage: ((event: { data: any }) => void) | null;
    onerror: ((event: { message: string }) => void) | null;
    onclose: ((event: { code: number; reason: string }) => void) | null;
  }

  export default WebSocket;
}
