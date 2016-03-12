# Ufront Guide for NodeJS target

This is a collection of guides that is related to the NodeJS target of Ufront.

## Prepare

#### Haxe

Install the latest ufront libraries.

```
git clone --recursive https://github.com/ufront/ufront.git
cd ufront
./setupDev
sudo haxelib run ufront --setup
```

#### NodeJS

0. You need to install NodeJS on your machine, please refer to the official NodeJS guide.
0. Install the "nodemon" package, `npm install -g nodemon`.

## Build

Navigate to each example folder, then build the hxml files there, for example:

```
cd minimal/01_static_results
haxe server.hxml
```

If there is a client, compile it as well:
```
haxe client.hxml
```

## Run

By default: Ufront requires the following node packages:
- compression
- body-parser
- cookie-parser
- express
- multer

The dependencies have been specified in the `package.json` file in each examples, so simply navigate to the `bin` folder, install the node dependencies by `npm install`.

```
cd bin
npm install
```

Then start the server:

```
npm start
```

## View

Open your browser and navigate to `localhost:2987`