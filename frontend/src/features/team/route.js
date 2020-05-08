
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state({
            'abstract': '!0',
            parent: 'app.theme',
            name: MOD_NAME,
            template: require('./template.html'),
            controller: MOD_NAME + 'Controller',
            controllerAs: MOD_NAME,
            data: { title: '' },
            params: { param1: null, param2: null, param3: null }
        });

        $stateProvider.state({
            name: 'team.list',
            url: '/' + MOD_NAME,
            views: {
                'body': {template: require('./views/body.html')},
                'body.painel-info': {template: require('./views/painel-info.html')},
                'body.painel-membros': {template: require('./views/painel-membros.html')},
                'modal': {template: require('./views/modal.html')},
                'modal-membros': {template: require('./views/modal-membros.html')},
                'modal-coordenador': {template: require('./views/modal-coordenador.html')}
            }
        })
    }
}
