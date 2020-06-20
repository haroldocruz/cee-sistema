import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.css';
import './sb-admin-2/metisMenu/metisMenu.css';
import './sb-admin-2/css/sb-admin-2.min.css';

import angular from 'angular';
// import uirouter from 'angular-ui-router';
// import uirouter_state_events from '../../../node_modules/angular-ui-router/release/stateEvents.min';
// import ng_morris from 'ng-morris-js/dist/ng-morris-js';

window.jQuery = window.$ = require('jquery/dist/jquery');
require('bootstrap/dist/js/bootstrap');
require('./sb-admin-2/js/sb-admin-2');
require('./sb-admin-2/metisMenu/metisMenu');

// require('ng-morris-js/dist/ng-morris-js')
// require('../../features/dashboard/plugins/raphael');
// require('../../features/dashboard/plugins/morris');

import 'chart.js';

import './style.css'
import './style.less'

// import route from './route';
// import controller from './controller';

// export default angular.module('app.theme', [uirouter])
//   .config(route)
//   .controller('themeController', controller)
//   .name;
  
module.exports = (MOD_NAME) => {
  return angular.module('app.' + MOD_NAME, [])
    .config(require('./route')(MOD_NAME))
    .controller(MOD_NAME + 'Controller', require('./controller').default)
    .name;
}
