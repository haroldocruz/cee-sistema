
import angular from 'angular';

// controller.$inject['$injector', '$scope', '$state', '$location'];
export default function controller($injector, $scope, $state, $location) {

    (async function () {
        var FN = await require('../../utils/alerts');
        const DB = require('../../services/api.service.axios');
        $scope.levelList = ['ADMINISTRATOR', 'MANAGER', 'EDITOR', 'SUPERUSER']

        $scope.itemList = [];
        $scope.alert = {};

        // $scope.search = $state.params;
        var searchFast = $location.search().searchFast;
        if(searchFast){
            $scope.filtro = searchFast;
        }

        window.onload = fnRead();

        //CRUD
        $scope.createItem = (x) => {
            (FN.fnConfirm()) ? DB.create('user', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        $scope.deleteItem = (x) => {
            (FN.fnConfirm()) ? DB.delete('user', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        $scope.editItem = (x) => { $scope.x = x; }
        $scope.updateItem = (x) => {
            // delete x.strategyList;
            // delete x.isFav;
            (FN.fnConfirm()) ? DB.update('user', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        async function fnRead() {
            await DB.read('user').then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message, $state);
                    $scope.$digest();
                } else {
                    FN.fnAlertBottom('success', resp.statusText, $state);
                    $scope.itemList = resp.data;
                    $scope.$digest();
                }
            })
        }

        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

    })()
}