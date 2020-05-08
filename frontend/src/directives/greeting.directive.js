import angular from 'angular';

function greeting() {
  return {
    restrict: 'E', //tipo de diretiva | E = Elemento
    scope: { //atributos embutidos
      name: '='
    },
    template: '<h1>Hello, {{name}}</h1>'
  }
}

export default angular.module('directives.greeting', [])
  .directive('greeting', greeting)
  .name;