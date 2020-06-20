
import angular from 'angular';
import uirouter from 'angular-ui-router';

import './style.css'
import './style.less'

// import './plugins/chart';

module.exports = (MOD_NAME) => {
  return angular.module('app.' + MOD_NAME, [uirouter])
    .config(require('./route')(MOD_NAME))
    .controller(MOD_NAME + 'Controller', require('./controller').default)
    .name;
}