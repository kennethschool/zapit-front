let ws: WebSocket | null = null;

export function getWS() {
  if (!ws) {
    ws = new WebSocket("wss://ysdkgg-3000.csb.app/");
  }
  return ws;
}
