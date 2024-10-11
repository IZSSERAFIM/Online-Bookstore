// 创建 WebSocket 连接
export function createWebSocket(id) {
  const userId = id;
  const socket = new WebSocket(`ws://localhost:8080/websocket/${userId}`);

  // 连接打开事件
  socket.onopen = function (event) {
    console.log("WebSocket connection opened:", event);
  };

  // 接收到消息事件
  socket.onmessage = function (event) {
    console.log("Received message:", event.data);
    // 你可以在这里处理接收到的消息，例如更新UI
  };

  // 连接关闭事件
  socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event);
  };

  // 连接错误事件
  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
  };

  // 返回 WebSocket 对象
  return socket;
}