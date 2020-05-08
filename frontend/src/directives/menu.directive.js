
import angular from 'angular';

function menu (){
    return {
        restrict: 'E', //tipo de diretiva
        scope: {name: '='},
        template: require('./templates/menu.html')
    }
}

export default angular.module('directives.menu', [])
.directive('menu', menu)
.name;