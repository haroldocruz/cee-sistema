
import angular from 'angular';

api.$inject = ['$injector'];
function api($injector) {
    
    var HTTP = $injector.get('$http');
    
    var url = 'http://localhost:3000' + '/';

    return {
        read: function (urn) {
            return HTTP({
                method: "GET",
                url: url + urn,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        },
        create: function (urn, item) {
            return HTTP.post(url + urn, item);
        },
        profile: function (urn, id) {
            return HTTP.get(url + urn + '/' + id);
        },
        update: function (urn, item) {
            return HTTP.put(url + urn + '/' + item._id, item);
        },
        delete: function (urn, id) {
            return HTTP.delete(url + urn + '/' + id);
        }
    };
}


export default angular.module('services.api-main', [])
    .service('apiMain', api)
    .name;