
import angular from 'angular';
import axios from 'axios';

api.$inject = ['$injector'];
function api($injector) {

    // var HTTP = $injector.get('$http');

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
        //$http
        create_1: function (urn, item) {
            return $http.post(url + urn, item);
        },
        //$.ajax
        create_2: function (urn, item) {
            return $.ajax({
                url: url + urn,
                type: 'POST',
                data: item,
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                // beforeSend: function () {
                // $("#modal-book").modal("show");
                // },
                success: function (data) {
                    // $("#modal-book .modal-content").html(data.html_form);
                    console.log(data);
                }
            });
        },
        //axios
        create_3: function (urn, item) {
            console.log("API-item -> " + JSON.stringify(item));
            return axios.post(url + urn, item)
            // .then(function (data) {
            //     console.log("API-data <- " + JSON.stringify(data.config.data));
            //     return data;
            // });
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

module.exports = api;