
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state('app.' + MOD_NAME, {
            url: '/' + MOD_NAME,
            template: require('./template.html'),
            controller: MOD_NAME + 'Controller',
            controllerAs: MOD_NAME,
            data: { title: '' },
            params: { param1: null, param2: null, param3: null }
        });
    }
}
