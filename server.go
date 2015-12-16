package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

type message struct {
	MessageType string `json:"type"`
	Body        string `json:"body"`
	Sender      string `json:"sender"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var connections = make(map[string]*websocket.Conn, 0)
var connectionId = 0

func generateConnectionId() string {
	connectionId++
	return fmt.Sprintf("User %v", connectionId)
}

func registerConnection(w http.ResponseWriter, r *http.Request) {
	connection, _ := upgrader.Upgrade(w, r, nil)
	id := generateConnectionId()

	connections[id] = connection

	go receiveMessages(id, connection)
}

func receiveMessages(id string, connection *websocket.Conn) {
	defer func() {
		connection.Close()
		delete(connections, id)
	}()

	for {
		_, body, err := connection.ReadMessage()

		if err != nil {
			return
		}

		fmt.Printf("Received and broadcasting message %s from %v\n", body, id)

		for _, otherConnection := range connections {
			messageType := "other"

			if connection == otherConnection {
				messageType = "self"
			}

			m := message{
				MessageType: messageType,
				Body:        string(body),
				Sender:      id,
			}

			otherConnection.WriteJSON(m)
		}
	}
}

func main() {
	http.HandleFunc("/ws", registerConnection)
	http.Handle("/", http.FileServer(http.Dir("client/dist")))

	http.ListenAndServe(":4201", nil)
}
