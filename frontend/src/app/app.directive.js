

export default function directive() {
    return {
        restrict: 'EA',
        template: require('./app.template.html'),
        link: function(scope,elm,attrs){},
        scope: {
            msg: "="
        },
        controller: require('./app.controller').default,
        // controllerAs: 'appCtrl'
    }
}