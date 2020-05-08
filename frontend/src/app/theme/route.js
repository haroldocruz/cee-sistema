module.exports = (MOD_NAME) => {
    return ($stateProvider) => {

        $stateProvider.state('app.' + MOD_NAME, {
            url: '',
            'abstract': '!0',
            views: {
                '': {
                    template: require('./template.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME
                },
                'menu_sup_dir@app.theme': { template: require('./views/menu_sup_dir.html') },
                'menu_nav@app.theme': { template: require('./views/menu_nav.html') },
                'content@app.theme': { template: '<ui-view></ui-view>' }
            }
        });
    }
}