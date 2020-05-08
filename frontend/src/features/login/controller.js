
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$rootScope', '$scope', '$state'];
export default function controller($injector, $scope, $rootScope, $state) {

    (async function () {
    var FN = await require('../../utils/alerts');

    $scope.getLogin = (x) => {
        DB.login('user/login', x).then((resp) => {
            if (fnSuccess(resp)) {
                FN.fnAlertBottom('failure', resp.data.message)
                console.log(resp.data.message)
            } else {
                $scope.rootUser = resp.data;
                sessionStorage.setItem('rootUser', JSON.stringify(resp.data))
                sessionStorage.setItem('token', resp.data.loginInfo.token)
                $state.go('dashboard');
            }
        })
    }

    function fnSuccess(resposta) {
        return (resposta.data.success == false) ? true : false;
    }
    })();
}