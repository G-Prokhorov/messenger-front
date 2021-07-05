export default function connect(setSocket) {
    let webSocket = new WebSocket("ws://localhost:5055");
    let timeOut;
    let first = true;
    webSocket.onmessage = (event) => {
        if (first) {
            first = false;
            setSocket(webSocket);
        }
        console.log(event.data);
    }

    webSocket.onclose = () => {
        timeOut = setTimeout(() => {
            connect(setSocket);
        }, 2000)
    }

    webSocket.onerror = () => {
        first = true;
        setSocket(null);
        webSocket.close();
    }

    webSocket.onopen = () => {
        clearTimeout(timeOut);
    }
}