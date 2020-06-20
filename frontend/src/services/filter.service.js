import angular from 'angular';

function arrayToString() {

    return function (items) {

        var strToReturn = "";
        for (var i in items) {
            strToReturn += items[i] + ',';
        }

        return strToReturn;
    };
}

export default angular.module('services.arrayToString', [])
    .filter('arrayToString', arrayToString)
    .name;