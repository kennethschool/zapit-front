let ws: WebSocket | null = null;

export function getWS() {
  if (!ws) {
    ws = new WebSocket("wss://server.kenchongo.com/");
  }
  return ws;
}
