
# CEE - Sistema de Supervisão
[![Dependency Status](https://david-dm.org/haroldocruz/angularjs-webpack/status.svg)](https://david-dm.org/haroldocruz/cee-sistema#info=dependencies) 
[![devDependency Status](https://david-dm.org/haroldocruz/cee-sistema/dev-status.svg)](https://david-dm.org/haroldocruz/cee-sistema#info=devDependencies)

# angularjs-webpack

[![Dependency Status](https://david-dm.org/preboot/angularjs-webpack/status.svg)](https://david-dm.org/preboot/angular-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/preboot/angularjs-webpack/dev-status.svg)](https://david-dm.org/preboot/angularjs-webpack#info=devDependencies)

A complete, yet simple, starter for AngularJS using Webpack (angularjs-webpack).

This workflow serves as a starting point for building AngularJS (1.x) applications using Webpack 2.x. Should be noted that apart from the pre-installed angular package, this workflow is pretty much generic.

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm scripts.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start

> Clone/Download the repo then edit `app.js` inside [`/src/app/app.js`](/src/app/app.js)

```bash
# clone our repo
$ git clone https://github.com/haroldocruz/cee-sistema.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

go to [http://localhost:8080](http://localhost:8080) in your browser.

# Casos de uso

* [Instituições](#instituições)
    * [Instituição](#instituição)
    * [Mantida](#mantida)
    * [Mantenedora](#mantenedora)
    * [Cursos](#cursos)
    * [Procurador Institucional](#procurador-institucional)
    * [Auxiliares](#auxiliares)
* [Instrumentos](#instrumentos)
* [Dimensões](#dimensoes)
* [Indicadores](#indicadores)
* [Critérios](#criterios)

# Instituições

## Instituição

Os dados de cada instituição são exibidos, sinteticamente, na tela. É exibido os seguintes dados:
* `Nome da `[`Mantida`](#mantida)
    * _(Obtido previamente)_
* `Nome da `[`Mantenedora`](#mantenedora)
    * _(Obtido previamente)_
* `Nome do `[`Procurador institucional`](#procurador-institucional)
    * _(Obtido previamente)_
* `Nome dos `[`Auxiliares`](#auxiliares)
    * _(Obtido previamente)_

## Mantida

Todos os dados da mantida são exibidos na tela, e possui os seguintes atributos:
* `Código`
    * _único_
    * _gerado automaticamente_
    * _gerado uma única vez (não permite atualização)_
* `Nome`
    * _obrigatório_
* `Sigla`
    * _(caso exista)_
* `Telefones`
    * _obrigatório (pelo menos um)_
* `Endereço principal`
    * _obrigatório_
    * _(Obtido previamente)_
* `Outros endereços`
    * _(caso haja)_

## Mantenedora

Todos os dados da mantenedora são exibidos na tela, e possui os seguintes atributos:
* `Código`
    * _único_
    * _gerado automaticamente_
    * _gerado uma única vez (não permite atualização)_
* `Nome`
    * _obrigatório_
* `Sigla`
    * _(caso exista)_
* `Telefones`
    * _obrigatório (pelo menos um)_
* `Endereço principal`
    * _obrigatório_
    * _(Obtido previamente)_
* `Outros endereços`
    * _(caso haja)_

## Cursos

Os dados são exibidos na tela, e possuem os seguintes atributos:
* `Nome`
    * _único (salvo se modalidades diferentes)_
    * _obrigatório_
* `Área`
    * _obrigatório_
    * _(Obtido previamente)_
* `Modalidade`
    * _obrigatório_
    * _(Obtido previamente)_

## Procurador Institucional

Os dados são exibidos na tela, e possuem os seguintes atributos:
* `Nome completo`
    * _obrigatório_
* `Telefone`
    * _obrigatório_
* `Email`
    * _obrigatório_
* `Endereço`
    * _recomendado_

## Auxiliares

Os dados são exibidos na tela, e possuem os seguintes atributos:
* `Nome completo`
    * _obrigatório_
* `Telefone`
    * _obrigatório_
* `Email`
    * _obrigatório_
* `Endereço`
    * _recomendado_

# License

[MIT](/LICENSE)
