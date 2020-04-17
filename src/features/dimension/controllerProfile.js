
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {
        var FN = await require('../../utils/alerts');
        $scope.statusEnum = require('../../utils/enumerations/StatusEnum')();
        const moment = require('moment');

        // $scope.item = {};
        $scope.indicadorList = [];
        $scope.estrategiaList = [];
        $scope.x = {}
        $scope.favorite = false;

        window.onload = fnRead();

        //*FAVORITE
        $scope.createFav = (idItem) => {
            var item = { fk_goal: idItem }
            DB.create('favorite', item).then((resp) => { });
            fnRead();
        }
        $scope.removeFav = (idFav) => {
            DB.delete('favorite', idFav).then(() => { });
            fnRead();
        }

        //*CREATE
        $scope.createItem = (modelName, x) => {
            x._dimension = $scope.item._id;
            (FN.fnConfirm()) ? DB.create(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        $scope.getDate = getDate;
        function getDate(date){
            // document.getElementById("indicadorPrazoModal").value = '2020-02-02';
        }

        //*PROFILE
        $scope.profileItem = (modelName, x, idx) => {
            if (!x.descricao) {
                DB.profile(modelName, x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        if (modelName == "indicador"){
                            $scope.indicadorList[idx] = resp.data;
                            // $scope.indicadorList[idx].prazo = moment($scope.indicadorList[idx].prazo).format('YYYY-MM-DD');
                            document.getElementById("indicadorPrazoModal").value = moment($scope.indicadorList[idx].prazo).format('YYYY-MM-DD');
                        }
                        if (modelName == "estrategia")
                            $scope.estrategiaList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        //*DELETE
        $scope.deleteItem = (modelName, x) => {
            (FN.fnConfirm()) ? DB.delete(modelName, x).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message, $state)
                } else {
                    if (modelName == 'dimension')
                        $state.go('dimension');
                    else
                        fnRead();
                }
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        //*UPDATE
        $scope.editItem = (x) => { $scope.x = x; }
        $scope.updateItem = (modelName, x) => {

            (FN.fnConfirm()) ? DB.update(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        //*READ
        async function fnRead() {
            var filter = { "codigo": $state.params.codigo }
            await DB.readFilter('dimension/filter', filter).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message, $state);
                    $scope.$digest();
                } else {
                    if (resp.data.length === 0) {
                        FN.fnAlertBottom('failure', "Nenhum dado encontrado para esta busca", $state);
                        $scope.$digest();
                    } else {
                        FN.fnAlertBottom('success', resp.statusText, $state);
                        $scope.item = resp.data[0];
                        $scope.indicadorList = resp.data[0]._indicador;
                        $scope.estrategiaList = resp.data[0]._estrategia;
                        $scope.$digest();
                    }
                }
            })
        }

        //*OTHERS
        function fnFavChecker() {
            DB.read('favorite').then((resp) => {
                var favList = resp.data;
                for (var i = 0; i < $scope.itemList.length; i++) {
                    for (var j = 0; j < favList.length; j++) {
                        if (favList[j].fk_goal)
                            if ($scope.itemList[i]._id == favList[j].fk_goal._id) {
                                $scope.itemList[i].idFav = favList[j]._id;
                                continue;
                            }
                    }
                }
                $scope.$digest();
            });
        }

        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

    })()
}