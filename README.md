
# CEE - Sistema de Supervisão

[![GitHub version](https://badge.fury.io/gh/haroldocruz%2Fcee-sistema.svg)](https://badge.fury.io/gh/haroldocruz%2Fcee-sistema)
![GitHub license](https://img.shields.io/github/license/haroldocruz/cee-sistema)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Build Status](https://travis-ci.org/haroldocruz/cee-sistema.svg?branch=master)

### Quick start

> Clone/Download the repo then edit `app.js` inside [`/src/app/app.js`](/src/app/app.js)

```bash
# clone our repo
$ git clone https://github.com/haroldocruz/cee-sistema.git my-app

# change directory to your app
$ cd my-app/frontend

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

go to [http://localhost:8080](http://localhost:8080) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm) or [n](https://github.com/tj/n))
* Ensure you're running Node (`v14.0.x`+) and NPM (`v6.14.x`+)

## Installing

* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as [`http://localhost:8080`](http://localhost:8080).

## Developing

### Build files

* single run: `npm run build`
* build files and watch: `npm start`

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

# License

[MIT](/LICENSE)
