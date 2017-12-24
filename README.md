The following was built for a course at Reed College. The assignment was to
build some sort of “networked application” using Go's [CSP][0]-style concurrent
programming primitives; I built a simple chat server with a corresponding
JavaScript client application. The client app uses callback functions and
futures to showcase two additional possibilities for organizing concurrent
programs.

The client application looks like this:

![A screeenshot of the chat application](normal-mode.png?raw=true)

It also includes a “fun mode” which replaces text with relevant GIFs, sourced
from an external API:

![The chat application’s “fun mode”](fun-mode.png?raw=true)

Below is the original note I wrote for my professor.

[0]: http://spinroot.com/courses/summer/Papers/hoare_1978.pdf

<hr>

# A simple chat server

This project implements a chat server with a simple client-server architecture.
Participants can visit the client in a web browser and broadcast messages to
anyone else currently connected. The client includes a “fun mode”, in which all
messages are replaced with a relevant GIFs using the [Giphy
API](https://github.com/giphy/GiphyAPI).

The server is implemented in Go. It accepts WebSocket connections at the `/ws`
HTTP endpoint, which are registered with an id in a simple map. Upon
registering a connection, a goroutine is spawned that waits until a message is
available. Once a message is read, its broadcasted to all connections
registered in the map. This is similar to the simple “fan out” architecture.

The client is an Ember app which initiates the WebSocket connection when
loaded. There's not too much to look at here. You might be interested in the
`PromisedWebSocket` utility I wrote, which wraps the browser’s WebSocket API to
be more Promise friendly. The `giphy-image` component also makes use of
Promises. So there's three approaches to concurrency in this project—Promises
(monadic in nature), the annoying callback API that they wrap, and Go's CSP
style goroutines!

This project does _not_ do many things. An improved implementation might:

- Persist the chat log, and restore it upon first load
- Ensure that state is consistent across clients
- Allow users to choose their own username
- Support multiple chat rooms
- Implement some form of authentication
- Use a more sophisticated message format (e.g with images, formatting, etc.)

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
