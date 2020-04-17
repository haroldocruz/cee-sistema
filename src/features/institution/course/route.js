
module.exports = ($stateProvider) => {
    const name = 'course';

    $stateProvider.state({
        parent: 'institution',
        name: name,
        url: '/' + name,
        params: { param1: null, param2: null, param3: null },
        views: {
            'body@institution': { template: require('./views/body.html') },
            'modal@institution': { template: require('./views/modal.html') },
        }
    })
}
