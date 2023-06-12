# Email API

This is an Express server written in TypeScript.

## Config

`.env` file

```properties
# Express
PORT=8000

# Email
SMTP_HOST=<host>
SMTP_PORT=<port>
SMTP_SECURE=<true|false>
SMTP_AUTH_USER=<email>
SMTP_AUTH_PASS=<password>
```

## Run

The server can be started with the following comamnd:

```shell
yarn dev
```

## Fetch API

```js
fetch("http://localhost:8000/notifications", {
  method: "GET",
  mode: "cors",
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

```js
fetch("http://localhost:8000/addNotification", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Connection: "keep-alive",
    Accept: "*",
  },
  body: JSON.stringify({ content: "Hello World" }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));
```

