
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
                'header@instrument': { template: require('./views/header.html') },

                'body@instrument': { template: require('./views/body.html') },

                'modal@instrument': { template: require('./views/modal.html') },
            }
        })

        $stateProvider.state({
            parent: 'app.theme',
            name: MOD_NAME + 'Profile',
            url: '/' + MOD_NAME + 'Profile',
            views: {
                '': {
                    // module: 'private',
                    template: require('./template-profile.html'),
                    controller: MOD_NAME + 'Controller',
                    controllerAs: MOD_NAME,
                    params: { param1: null, param2: null, param3: null },
                    data: { title: '' }
                },
                'header@instrumentProfile': { template: require('./views/header.html') },

                'body@instrumentProfile': { template: require('./views/body-profile.html') },

                'modal@instrumentProfile': { template: require('./views/modal.html') },
            }
        })

    }
}
