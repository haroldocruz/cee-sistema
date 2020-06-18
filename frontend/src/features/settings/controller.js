
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$scope', '$rootScope', '$state'];
export default function controller($injector, $scope, $rootScope, $state) {

    (async function () {
        var FN = require('../../utils/alerts');
        const Enums = require('../../utils/enumerations/Enums');
        const Util = require('../../utils/util');
        $scope.modelNameEnum = await require('../../utils/enumerations/ModelNameEnum')();
        $scope.modelNameList = Object.values($scope.modelNameEnum);
        $scope.contextEnum = await require('../../utils/enumerations/ContextEnum')();
        $scope.contextList = Object.values($scope.contextEnum);

        $scope.coordName = 'Nome do coordenador aqui'

        $scope.selectedItem;
        $scope.itemList = [];
        $scope.x = {}
        $scope.x.role = []

        $scope.favorite = false;
        $scope.filtro = '';

        $('.modal').on('show.bs.modal', function (event) {
            var idx = $('.modal:visible').length;
            $(this).css('z-index', 1040 + (10 * idx));
        });
        $('.modal').on('shown.bs.modal', function (event) {
            var idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
            $('.modal-backdrop').not('.stacked').css('z-index', 1039 + (10 * idx));
            $('.modal-backdrop').not('.stacked').addClass('stacked');
        });
        $('.modal').on('hidden.bs.modal', function (event) {
            if ($('.modal:visible').length > 0) {
                setTimeout(function () {
                    $(document.body).addClass('modal-open');
                }, 0);
            }
        });

        criarObj();
        function criarObj() {
            $scope.x = { role: [], visibility: $scope.contextEnum.MINIMO }
            for (var i = 0; i < $scope.modelNameList.length; i++) {
                var x = {}
                x._modelName = $scope.modelNameList[i]
                x.create = null
                x.read = null
                x.update = null
                x.delete = null

                $scope.x.role.push(x)
            }
        }

        $scope.selected = {
            'idx': null,
            'comando': null
        };
        $scope.selecteds = (sel) => {
            $scope.selected = sel;
        }

        window.onload = fnRead();

        $scope.insereNome = (idx) => {
            $scope.x.name = $scope.modelNameList[idx]
        }
        $scope.inserirLegenda = (legenda) => {
            console.log(legenda) //! APAGAR
            var idx = $scope.selected.idx;
            console.log($scope.selected) //! APAGAR
            if ($scope.selected.comando == 'create')
                $scope.x.role[idx].create = legenda
            if ($scope.selected.comando == 'read')
                $scope.x.role[idx].read = legenda
            if ($scope.selected.comando == 'update') {
                $scope.x.role[idx].update = legenda
                console.log($scope.x.role[0]) //! APAGAR
            }
            if ($scope.selected.comando == 'delete')
                $scope.x.role[idx].delete = legenda
            // $scope.$digest()
        };

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
        $scope.createItem = (x) => {
            (FN.fnConfirm()) ? DB.create('accessLevel', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        //*PROFILE
        $scope.profileItem = async (x, idx) => {
            if (!x.descricao) {
                DB.profile('accessLevel', x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        $scope.itemList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        //*DELETE
        $scope.deleteItem = (x) => {
            (FN.fnConfirm()) ? DB.delete('accessLevel', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        //*UPDATE
        // $scope.editItem = (x) => { $scope.x = x }
        $scope.editItem = (x) => {
            if (x == null) {
                console.log("CRIAR"); //! APAGAR
                criarObj();
            }
            else {
                console.log("USAR"); //! APAGAR
                $scope.x = x;
                // Util.extend($scope.x, x);
            }
        }
        $scope.updateItem = (x) => {
            // delete x.strategyList;
            // delete x.isFav;
            (FN.fnConfirm()) ? DB.update('accessLevel', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : $scope.$digest();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        //*READ
        async function fnRead() {
            $scope.isLoadingItem = true;
            await DB.read('accessLevel').then((resp) => {
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