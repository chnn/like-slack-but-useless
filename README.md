The following was for a course at Reed College. The assignment was to build
some sort of “networked application” using Go.

<hr>

# A simple chat server

This project implements a chat server with a simple client-server architecture.
Participants can visit the client in a web browser and broadcast messages to
anyone else currently connected.

The server is implemented in Go. It accepts WebSocket connections at the `/ws`
HTTP endpoint, which are registered with an id in a simple map. Upon
registering a connection, a goroutine is spawned that waits until a message is
available. Once a message is read, its broadcasted to all connections
registered in the map. This is similar to the simple “fan out” architecture.

The client is an Ember app which initiates the WebSocket connection when
loaded. There's not too much to look at here. You might be interested in the
`PromisedWebSocket` utility I wrote, which wraps the browser's WebSocket API to
be more Promise friendly. The `giphy-image` component also makes use of
Promises. So there's three approaches to concurrency in this project—Promises
(monadic in nature), the annoying callback API that they wrap, and Go's CSP
style goroutines!

### Running this project locally

First ensure that Go, Node, and npm are installed.

Then, build the client app:

```
cd client
npm install -g ember-cli@1.13.13 bower
npm install
bower install
ember build
```

Then from the root of the project directory, run the go server:

```
go get ./...
go run server.go
```

Then navigate to [http://localhost:4201](http://localhost:4201).
