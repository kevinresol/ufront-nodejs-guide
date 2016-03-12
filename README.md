# Ufront Guide for NodeJS target

This is a collection of guides that is related to the NodeJS target of Ufront.

#### Why NodeJS only?

Actually, Ufront does support the neko and php target (and they work very well). 
But according to my practical experience, the amount of libraries of nodejs (from npm) is much much more than what you can find for neko or php. 
That makes development much easier and faster. (p.s. for neko, you are basically limited to only use Haxe libraries). So, let's focus on NodeJS!

#### Compile for neko/php

Since Ufront does support neko and php, so the guides here should also apply to these two targets, with slight modification. The main difference is the entry point. 
In nodejs, we call `listen(port)` to start the server, and in neko/php we call `executeRequest()`.
So, by changing this call you should be able to compile most of the examples in this guide.

#### Repo structure

The `minimal` folder contains a set of minimal examples. 
The scope of each of these minimal examples is very confined, so readers can easily
identify the minimum code required for a certain feature.

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