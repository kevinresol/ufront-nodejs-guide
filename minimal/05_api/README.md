# Minimal example: API

In this example, we will set up a minimal server that will use an API

In Ufront, we have controllers and API. Controllers mainly handles routes and parse parameters from a request,
while API usually handle "core" logics, like interacting with database, and authentications. 

You can also put your "core" or authentications logic inside a controller, but that is HIGHLY DISCOURAGED.
because controller code will be compiled into client app and you risk leaking
critical information to users, also authentications done in client side is also not trustable.
On the other hand, APIs are NOT compiled into client app, any API calls from client app is 
actually a remoting call, i.e. the API code are always run in the server instead of the client. 
This way your logics and secrets are protected, and we can make sure authentications are not maliciously manipulated.