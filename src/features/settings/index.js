
import angular from 'angular';

import './style.css'
import './style.less'

module.exports = (MOD_NAME) => {
  return angular.module('app.theme.' + MOD_NAME, [])
    .config(require('./route')(MOD_NAME))
    .controller(MOD_NAME + 'Controller', require('./controller').default)
    .controller(MOD_NAME + 'ControllerProfile', require('./controllerProfile').default)
    .name;
}