
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state('app.theme.' + MOD_NAME, {
            url: '/' + MOD_NAME,
            template: require('./template.html'),
            controller: MOD_NAME + 'Controller',
            controllerAs: MOD_NAME,
            data: { title: '' },
            params: { param1: null, param2: null, param3: null }
        });

        $stateProvider.state('app.theme.' + MOD_NAME + 'Profile', {
            url: '/meta/{codigo}',
            params: { codigo: null, param1: null, param2: null, param3: null },
            template: require('./templateProfile.html'),
            controller: MOD_NAME + 'ControllerProfile',
            controllerAs: MOD_NAME,
            data: { title: '' }
        });
    }
}
