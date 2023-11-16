import { PORT } from "../constants/ws";

function createSocketClient(path = "/") {
  return new Promise((resolve, reject) => {
    const client = new WebSocket(`ws://localhost:${PORT}${path}`);

    client.onopen = () => {
      resolve(client);
    };

    client.onerror = (error) => {
      reject(error);
    };
  });
}

export default createSocketClient;
