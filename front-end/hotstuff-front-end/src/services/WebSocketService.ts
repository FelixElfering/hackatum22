import config from "../config"

class WebSocketService {

  static connection = new WebSocket("wss://" + config.backendIP + config.webSocketSuffix)

}

export default WebSocketService