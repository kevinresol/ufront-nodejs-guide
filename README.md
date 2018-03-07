**Warning:** Ufront is not actively maintained now (as at Mar 2018). I highly recommend you to use [tink_web](https://github.com/haxetink/tink_web) instead

# Ufront Guide for NodeJS target

This is a collection of guides for the NodeJS target of Ufront ([website](http://ufront.net), [repo](https://github.com/ufront)).

## Overview

#### What is Ufront?

From Ufront repo: 

> Ufront is a client/server MVC web framework for Haxe. It allows you to share models, views and controllers between both server-side and client-side code. Client side, your app will run as a fast single-page-app. But everything can still work server-side - which makes for fast first page loads, great SEO, and a good fallback for old browsers.

#### Why NodeJS only?

Actually, Ufront does support the neko and php target (and they work very well). 
But according to my practical experience, the amount of libraries of nodejs (from npm) is much much more than what you can find for neko or php. 
That makes development much easier and faster. (p.s. for neko, you are basically limited to only use Haxe libraries). So, let's focus on NodeJS!

#### Compile for neko/php (if you insist)

Since Ufront does support neko and php, so the guides here should also apply to these two targets, with slight modification. The main difference is the entry point. 
In nodejs, we call `listen(port)` to start the server, and in neko/php we call `executeRequest()`.
So, by changing this call you should be able to compile most of the examples in this guide.

#### Repo structure

The `minimal` folder contains a set of minimal examples. 
The scopes of these minimal examples are very confined, so readers can easily
identify the minimum code required for a certain feature.

The `integrated` folder contains a set of more-real-world examples that integrates 
several features. These examples are usually more complex and maybe a little bit 
harder to understand, make sure you have gone through the minimal examples first, 
to gain a brief understanding of the individual features.

#### Feedback

Please feel free to open issues/PR for:
- Example request
- Bug report / bug fixes
- Any other general feedback / questions

Or you can join our chatroom: https://gitter.im/ufront/ufront


## Usage

The following are the steps to build and run the examples.

### Prepare

##### Haxe

Install the required libraries.

```
haxelib git ufront-mvc https://github.com/ufront/ufront-mvc
haxelib install express
haxelib install hxnodejs
haxelib install pushstate
```

##### NodeJS

0. You need to install NodeJS on your machine, please refer to the official NodeJS guide ([website](https://nodejs.org)).
0. Install the "nodemon" package, `npm install -g nodemon`.

### Build

Navigate to each example folder, then build the hxml files there, for example:

```
cd minimal/01_static_results
haxe server.hxml
```

If there is a client, compile it as well:
```
haxe client.hxml
```

### Run

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

### View

Open your browser and navigate to `localhost:2987`
