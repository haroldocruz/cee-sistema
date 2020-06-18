
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
                    data: { title: 'Ações' }
                },
                'header@critery': { template: require('./views/header.html') },
                
                'body@critery': { template: require('./views/body.html') },
                'body.painel-info@critery': { template: require('./views/painel-info.html')},
                'body.painel-evidencia@critery': { template: require('./views/painel-evidencia.html')},
                
                'modal@critery': { template: require('./views/modal.html') },
                'modal-evidencia@critery': { template: require('./views/modal-evidencia.html') },
            }
        })

        $stateProvider.state({
            parent: 'app.theme',
            name: MOD_NAME+'Profile',
            url: '/meta/:metaCod/estrategia/:estrategiaCod/critery/:criteryCod',
            module: 'private',
            views: {
                '': {
                    template: require('./templateProfile.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME,
                    params: { metaCod: null, estrategiaCod: null, criteryCod: null, param1: null, param2: null, param3: null },
                    data: { title: 'Ações' }
                },
                // 'header@critery': { template: require('./views/header.html') },
                
                'body@criteryProfile': { template: require('./views/body.html') },
                'painel-info@criteryProfile': { template: require('./views/painel-info.html')},
                'painel-evidencia@criteryProfile': { template: require('./views/painel-evidencia.html')},
                
                'modal@criteryProfile': { template: require('./views/modal.html') },
                'modal-evidencia@criteryProfile': { template: require('./views/modal-evidencia.html') },
            }
        })

        // $stateProvider.state('app.theme.' + MOD_NAME + '2', {
        //     url: '/meta/:metaCod/estrategia/:estrategiaCod',
        //     params: { metaCod: null, estrategiaCod: null, param1: null, param2: null, param3: null },
        //     template: require('./template.html'),
        //     controller: MOD_NAME + 'Controller',
        //     controllerAs: MOD_NAME,
        //     data: { title: '' }
        // });
    }
}
