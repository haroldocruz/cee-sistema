
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$scope', '$rootScope', '$state'];
export default function controller($injector, $scope, $rootScope, $state) {

    (async function () {
        // * EXPORTS

        var FN = require('../../utils/alerts');
        var Util = require('../../utils/util');

        const Enums = require('../../utils/enumerations/Enums')

        // * CONSTANTS AND VARIABLES
        $scope.itemList = (localStorage.getItem('dimension')) ? JSON.parse(localStorage.getItem('dimension')) : [];

        $scope.x = {}
        $scope.favorite = false;
        $scope.filtro = '';
        $scope.idxSelected;


        // * FUNCTIONS
        $scope.createItem = createItem2;
        $scope.editItem = editItem2;
        $scope.updateItem = updateItem2;
        $scope.deleteItem = deleteItem2;

        // window.onload = fnRead();

        // ? START CRUD LOCALSTORAGE -----------------------------------------------

        const storageName = "dimension";

        function createItem2(x) {
            x._id = Util.getRandomInt(100000000, 999999999);;
            $scope.itemList.push(x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }
        function editItem2(idx, x) {
            if (idx != null) {
                $scope.idxSelected = idx;
                $scope.x = x;
                // Util.extend(x, $scope.x)
            } else {
                $scope.x = {}
            }
        }

        function updateItem2(x) {
            let idx = $scope.idxSelected;
            $scope.itemList.splice(idx, 1, x);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }

        function deleteItem2(idx) {
            $scope.itemList.splice(idx, 1);
            localStorage.setItem(storageName, JSON.stringify($scope.itemList));
        }

        // ? END CRUD LOCALSTORAGE -----------------------------------------------

        // * CREATE
        function createItem(x) {
            (FN.fnConfirm()) ? DB.create('dimension', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        // * DELETE
        function deleteItem(x) {
            (FN.fnConfirm()) ? DB.delete('dimension', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        // * UPDATE
        function editItem(idx, x) {
            if (idx != null) {
                $scope.idxSelected = idx;
                $scope.x = x;
                // Util.extend(x, $scope.x)
            } else {
                $scope.x = {}
            }
        }

        function updateItem(x) {
            // delete x.strategyList;
            // delete x.isFav;
            (FN.fnConfirm()) ? DB.update('dimension', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : $scope.$digest();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        // * PROFILE
        $scope.profileItem = async (x, idx) => {
            if (!x.descricao) {
                DB.profile('dimension', x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        $scope.itemList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
                loadingChart(x);
            }
        }

        // * READ
        async function fnRead() {
            $scope.isLoadingItem = true;
            await DB.read('dimension').then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message, $state);
                    $scope.$digest();
                } else {
                    // $scope.$emit('viewContentLoaded')
                    FN.fnAlertBottom('success', resp.statusText, $state);
                    $scope.itemList = resp.data;
                }
            }).finally(() => {
                $scope.isLoadingItem = false
                $scope.$digest();
            })
        }

        // * CHART
        async function loadingChart(x) {
            const random = require('../../utils/randomizer')
            var acaoFull = random(10, 100);
            var acaoDone = random(1, acaoFull);
            // var filter = { "_dimension": x._id, "situacao": Enums.situacao.CONCLUIDA };
            // var acaoFull = 10;
            // var acaoDone = 5;
            // var filter = { "_dimension": x._id };
            // await DB.readFilter('acao/filter', filter).then((resp) => {
            //     acaoFull = resp.data.length;
            //     acaoDone = resp.data.filter((e) => {
            //         if (e.situacao == Enums.situacao.CONCLUIDA)
            //             return;
            //     });
            // });
            $scope.doughnutChart(acaoDone, acaoFull, 'id_chart' + x._id);
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

        //*CHART CONFIG
        function doughnutChart(concluido, total, idNameItem) {
            const ctx = document.getElementById(idNameItem).getContext('2d');

            var falta = total - concluido;

            var data = {
                datasets: [{
                    data: [concluido, falta],
                    borderWidth: 0.5,
                    backgroundColor: ['#009900', 'rgba(255, 159, 64, 0.9)']
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    '' + (concluido * 100 / total).toFixed(0) + '% Concluído',
                    '' + (falta * 100 / total).toFixed(0) + '% em processo'
                ]
            };

            var options = {
                legend: {
                    display: true,
                    position: 'right'
                },
            }

            new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });
        }

    })()
}