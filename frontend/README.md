
# CEE - Sistema de Supervisão

>![Made For](https://img.shields.io/badge/MADE%20FOR-MSOM%2EINFO-blue.svg?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/haroldocruz/cee-sistema?style=for-the-badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)
![GIT](https://img.shields.io/badge/Main%20CVS-GIT-blue.svg?style=for-the-badge&logo=GIT&color=F05032&logoColor=fff)

>![FRONTEND](https://img.shields.io/badge/-FRONTEND-blue.svg?style=for-the-badge&color=333)
![HTML5](https://img.shields.io/badge/-HTML5-blue.svg?style=for-the-badge&logo=HTML5&color=E34F26&logoColor=fff)
![CSS3](https://img.shields.io/badge/-CSS3-blue.svg?style=for-the-badge&logo=CSS3&color=2195F1&logoColor=fff)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-blue.svg?style=for-the-badge&logo=Bootstrap&color=563D7C&logoColor=fff)
![JavaScript](https://img.shields.io/badge/-JavaScript-blue.svg?style=for-the-badge&logo=JavaScript&color=F7DF1E&logoColor=fff)
![AngularJS](https://img.shields.io/badge/-AngularJS-blue.svg?style=for-the-badge&logo=AngularJS&color=E23237&logoColor=fff)
![Webpack](https://img.shields.io/badge/-Webpack-blue.svg?style=for-the-badge&logo=Webpack&color=8DD6F9&logoColor=fff)
![Babel](https://img.shields.io/badge/-Babel-blue.svg?style=for-the-badge&logo=Babel&color=F9DC3E&logoColor=fff)

### Quick start

> Clone/Download the repo then edit `app.index.js` inside [`/frontend/src/app/app.index.js`](/frontend/src/app/app.index.js)

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
