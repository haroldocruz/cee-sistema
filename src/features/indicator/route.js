
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state({
            parent: 'app.theme',
            name: MOD_NAME,
            url: '/' + MOD_NAME,
            views: {
                '': {
                    // module: 'private',
                    template: require('./template.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME,
                    params: { param1: null, param2: null, param3: null },
                    data: { title: '' }
                },
                'body@indicator': { template: require('./views/body.html') },
                'modal@indicator': { template: require('./views/modal.html') },
                'modal-instrument@indicator': { template: require('./views/modal-instrument.html') },
            }
        })
    }
}
