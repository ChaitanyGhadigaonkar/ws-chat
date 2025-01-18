import { Server } from "http";
import { WebSocketServer } from "ws";

class ServerManager {
  private static server: WebSocketServer;

  public static getServer(server: Server) {
    if (!this.server) {
      const wss = new WebSocketServer({ server });
      this.server = wss;
    }

    return this.server;
  }
}

export default ServerManager;
