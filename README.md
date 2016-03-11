# Ufront Guide for NodeJS target

This is a collection of guide that is related to the NodeJS target of Ufront.

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

## Run

Navigate to the bin folder, install the node dependencies and then run

```
cd bin
npm install
npm start
```

## View

Open your browser and navigate to `localhost:2987`