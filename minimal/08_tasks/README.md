# Minimal example: Ufront Tasks

In this example, we will set up a minimal task script.

Ufront task scripts are program that run in the command line, acting like a hybrid of
server and client. In fact, we do not actually need a server here because all the API functions
are compiled into the task script, making it like a server that doesn't listen to incoming
http request, but instead invoked through command line.

Since the task script resides in the server, you can write admin programs in this
way. For example, you can write a task that will clear obsolete/expired data from the database,
or a task that will call an API to send out emails.

UFTaskSet is based on the mcli library, for more usage details please refer to mcli docs.

## How to build / run

#### Build:

```bash
haxe tasks.hxml
```


#### Run:

```bash
cd bin
node tasks.js --test
node tasks.js --read-path start_server.sh
```