
module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        require('./maintainer/route')($stateProvider);
        require('./maintained/route')($stateProvider);
        require('./course/route')($stateProvider);
        require('./procurator/route')($stateProvider);
        require('./auxiliary/route')($stateProvider);

        $stateProvider.state({
            parent: 'app.theme',
            name: MOD_NAME,
            url: '/' + MOD_NAME,
            params: { param1: null, param2: null, param3: null },
            views: {
                '': {
                    // module: 'private',
                    template: require('./template.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME,
                    data: { title: '' }
                },
                'body@institution': { template: require('./views/body.html') },
                'modal@institution': { template: require('./views/modal.html') },

                'modal-maintained@institution': { template: require('./views/modal-maintained.html') },
                'modal-maintainer@institution': { template: require('./views/modal-maintainer.html') },
                'modal-evidencia@institution': { template: require('./views/modal-evidencia.html') },
            }
        })
    }
}
