# Minimal example: Remoting

In this example, we will set up a minimal client application that use remoting.

Remoting is the type-safe way for a client to communicate with the server.
Some quick comparison of Haxe remoting vs AJAX:

0. Haxe remoting is fully typed vs ajax is just plain text or json
0. We can basically send ANY haxe types over the wire with haxe remoting, including enum, class instances, etc.
0. Since it is fully typed, it gives you autocomplete in IDE
0. It helps you share the same piece of code between server and client
0. It is cross-platform: same code, compile to different targets

### Prerequisites

- [API](05_api)
