
import 'babel-polyfill'
// MODULO PRINCIPAL
import angular from 'angular';
import uirouter from 'angular-ui-router'; //package angular-ui-router
import uirouter_state_events from '../../node_modules/angular-ui-router/release/stateEvents.min';

var FEATURES = [
    // uirouter,
    require('angular-ui-router').default,
    'ui.router.state.events',

    require('./theme')('theme'),
    require('../features/generic')('generic'),
    
    require('../features/login')('login'),
    require('../features/settings')('settings'),
    
    require('../features/critery')('critery'),
    require('../features/dashboard')('dashboard'),
    require('../features/dimension')('dimension'),
    require('../features/home')('home'),
    require('../features/indicator')('indicator'),
    require('../features/inloco')('inloco'),
    require('../features/institution')('institution'),
    require('../features/instrument')('instrument'),
    require('../features/team')('team'),
    require('../features/user')('user'),
    // require('../features/upload')('upload')
]

let layout = () => {
    return {
        // template: '<div ui-view></div>',
        template: require('./app.template.html'),
        controller: 'AppCtrl',
        controllerAs: 'appCtrl'
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, FEATURES)
    .config(require('./app.route').default)
    // .directive('app', layout)
    .directive('app', require('./app.directive').default)
    // .controller('AppCtrl', require('./app.controller').default)