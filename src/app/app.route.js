
routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/app/dashboard');

    $stateProvider.state('app', {
        url: '/app',
        'abstract': '!0', 
        // views: {
        //     '': { 
        //         template: require('./app.template.html') 
        //     }
        // }
    });

    // $stateProvider.state('app2', {
    //     url: '/app2',
    //     'abstract': '!0', 
    //     views: {
    //         '': { template: require('./app.template.layout.void.html') }
    //     }
    // });
}
