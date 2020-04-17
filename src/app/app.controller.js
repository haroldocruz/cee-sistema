

controller.$inject = ['$injector', '$rootScope', '$scope', '$state', '$transitions'];
export default function controller($injector, $scope, $rootScope, $state, $transitions) {
    /*
        $transitions.onBefore({ to: 'app.**' }, function (trans) { });
        $transitions.onSuccess({ to: 'app.**' }, function (trans) { });
    
        $rootScope.$on('$stateChangeSuccess', function (toState, toParams, fromState, fromParams) {
            
        });
    
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            // if (toState.module === 'private' && !$cookies.Session) {
            console.log("AKI")
            // $rootScope.isloadingApp = true
            if (toState.module === 'private' && !$scope.rootUser) {
                // If logged out and transitioning to a logged in page:
                e.preventDefault();
                $state.go('app.login');
                // } else if (toState.module === 'public' && $cookies.Session) {
            } else if (toState.module === 'public') {
                // If logged in and transitioning to a logged out page:
                // e.preventDefault();
                // $state.go('tool.suggestions');
            };
        });
    
        $rootScope.$on('$viewContentLoading', function () {
            // your stuff here…
            // $scope.isloadingApp = true
        });
        // $rootScope.$on('$viewContentLoaded', function () {
        $rootScope.$on('viewContentLoaded', function () {
            // your stuff here…
            // $scope.isloadingApp = false
        });
    */
    (async function () {

        const FN = require('../utils/alerts');
        const DB = require('../services/api.service.axios');

        //* VARIABLES DECLARATIONS
        $rootScope.ENUMS = {}
        $rootScope.rs = {}
        $rootScope.rootUser = {}
        // $rootScope.isloadingApp = true

        window.onload = fnOnLoad();

        //* VERIFICA SE USER ESTÁ LOGADO
        async function fnOnLoad() {
            if (sessionStorage.getItem('rootUser')) {
                $scope.rootUser = JSON.parse(sessionStorage.getItem('rootUser'));
            }
            else
                $scope.rootUser = { name: "Anonimous", accessLevel: "UnRegistered" };

            // $scope.$digest();
        }

        //* FAZ LOGOFF SEGURO
        $scope.logoff = function () {
            $scope.rootUser.loginInfo = {};
            DB.update('user', $scope.rootUser).then((resp) => {
                if (fnSuccess(resp)) {
                    // console.log(resp.data.message)
                    FN.fnAlertBottom('failure', resp.data.message, $state)
                } else {
                    $scope.rootUser = null;
                    sessionStorage.removeItem('rootUser');
                    sessionStorage.removeItem('token');
                    FN.fnAlertBottom('success', resp.data.message, $state)
                    $state.go('app.login');
                }
            });
        }

        // * ATALHO (CTRL+s) FOCUS NO CAMPO 'SEARCH_FAST'
        document.addEventListener("keydown", function (e) {
            if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
                e.preventDefault();
                document.getElementById('searchFast').focus();
                document.getElementById("searchFast").select();
            }
        }, false);

        // DB.read('enums').then((resp) => {
        //     $rootScope.ENUMS = resp.data;
        // })


        // console.log($state.get().map((s)=>{ return $state.href(s.name)}))
        // console.log($state.get().map((s) => { return s.name }))



        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

    })();
}
