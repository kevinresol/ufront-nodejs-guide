# Integrated example: Advanced Authentication

In this example, we will set up a server that will handle login, check credentials with database and persist login status across requests.

## Overview

#### Database

We will use MongoDB as our database backend in this example. 
Haxe's SPOD is a good library but it is not (yet?) supported on nodejs.
For simplicity we will use the mongoose library as our database driver.

#### Persistent Login Status

We will use Json Web Tokens to persist login status.


## Prepare

#### Install MongoDB

Please refer to MongoDB official guide.
To test if MongoDB is installed successfully, run the following in terminal:
```bash
mongo
```

If you can enter the mongo shell then you are done.


#### More Haxe Dependencies

In addition to the libraries listed in the main README, we need js-kit and jsonwebtoken:
```bash
haxelib git js-kit https://github.com/clemos/haxe-js-kit
haxelib install hxnodejs-jsonwebtoken
```


## Build

Build server.hxml and tasks.hxml

```bash
haxe server.hxml && haxe tasks.hxml
```

## Run

```bash
# cd to bin/ folder
cd bin
# install node dependencies
npm install
# create an user in database
node tasks.js --create-user
# start the web server
npm start
```