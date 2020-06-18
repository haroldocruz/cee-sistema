
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state({
            parent: 'app',
            name: MOD_NAME,
            url: '/' + MOD_NAME,
            params: { param1: null, param2: null, param3: null },
            // url: '/' + MOD_NAME + '/:instrument',
            views: {
                '': {
                    // module: 'private',
                    template: require('./template.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME,
                    data: { title: '' }
                },
                'body@inloco': { template: require('./views/body.html') },
                'body.painel-indicator@inloco': { template: require('./views/painel-indicator.html') },
                'body.painel-indicator.painel-critery@inloco': { template: require('./views/painel-critery.html') },
                'modal@inloco': { template: require('./views/modal.html') },
                'modal-critery@inloco': { template: require('./views/modal-critery.html') },
            }
        })
    }
}
