package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

func main() {
	http.HandleFunc("/ws", serveWs)
	http.Handle("/", http.FileServer(http.Dir("client/dist")))

	http.ListenAndServe(":4201", nil)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, _ := upgrader.Upgrade(w, r, nil)
	fmt.Printf("New WebSocket connection", ws)
}
