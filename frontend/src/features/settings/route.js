
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
            url: MOD_NAME,
            views: {
                'painel-contexto': { template: require('./views/painel-contexto.html') },
                'painel-regras': { template: require('./views/painel-regras.html') },
                'body': { template: require('./views/body.html') },
                'body.painel-info': { template: require('./views/painel-info.html') },
                'body.painel-usuarios': { template: require('./views/painel-usuarios.html') },

                'modal': { template: require('./views/modal.html') },
                'modal-legenda': { template: require('./views/modal-legenda.html') },
            }
        });
    }
}
