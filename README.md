## Running this example locally

Make sure that Go, Node, and npm are installed.

Build the client app:

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
