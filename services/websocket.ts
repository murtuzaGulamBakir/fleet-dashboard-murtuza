export function initWebSocket(onMessage: (data: any) => void) {
    const socket = new WebSocket("wss://case-study-26cf.onrender.com");

    socket.onopen = () => console.log("✅ WebSocket connected");
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onclose = () => console.log("❌ WebSocket disconnected");

    return socket;
}
