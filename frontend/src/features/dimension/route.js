
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state({
            'abstract': '!0',
            parent: 'app.theme',
            name: MOD_NAME,
            template: require('./template.html'),
            controller: MOD_NAME + 'Controller',
            controllerAs: MOD_NAME
        });

        $stateProvider.state({
            name: MOD_NAME + '.list',
            url: '/dimension',
            views: {
                // 'header': { template: require('./views/header.html') },

                'body': { template: require('./views/body.html') },
                'body.painel-info': { template: require('./views/painel-info.html') },
                'body.painel-graph': { template: require('../generic/views/painel-graph.html') },

                'modal': { template: require('./views/modal.html') },
            }
        });

        $stateProvider.state({
            parent: 'app.theme',
            name: MOD_NAME + 'Profile',
            url: '/dimension/{codigo}',
            views: {
                '': {
                    template: require('./templateProfile.html'),
                    controller: MOD_NAME + 'ControllerProfile',
                    controllerAs: MOD_NAME,
                    params: { codigo: null, param1: null, param2: null, param3: null },
                },
                'body@dimensionProfile': { template: require('./views/body.html') },

                'painel-info-full@dimensionProfile': { template: require('./views/painel-info-full.html') },
                'painel-indicador@dimensionProfile': { template: require('./views/painel-indicador.html') },
                'painel-estrategia@dimensionProfile': { template: require('./views/painel-estrategia.html') },

                'modal-dimension@dimensionProfile': { template: require('./views/modal.html') },
                'modal-estrategia@dimensionProfile': { template: require('../indicator/views/modal.html') },
                'modal-indicador@dimensionProfile': { template: require('./views/modal-indicador.html') },
            },
        });
    }
}
