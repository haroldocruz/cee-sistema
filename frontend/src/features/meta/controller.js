
const DB = require('../../services/api.service.axios');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {
        var FN = await require('../../utils/alerts');
        const Enums = require('../../utils/enumerations/Enums')

        $scope.coordName = 'Nome do coordenador aqui'

        $scope.itemList = [];
        $scope.x = {}
        $scope.favorite = false;

        window.onload = fnRead();

        // $scope.findStrategy = (m, idx) => {
        //     if (m.strategyList == undefined) {
        //         m.strategyList = $scope.itemList[idx].strategyList = [];
        //         var filter = { 'fk_goal': m._id }; console.log(m._id);
        //         DB.readFilter('estrategia/filter', filter).then((data) => {
        //             $scope.itemList[idx].strategyList = data.data;
        //             $scope.$digest();
        //         });
        //     }
        // }

        //FAVORITE
        $scope.createFav = (idItem) => {
            var item = { fk_goal: idItem }
            DB.create('favorite', item).then((resp) => { });
            fnRead();
        }
        $scope.removeFav = (idFav) => {
            DB.delete('favorite', idFav).then(() => { });
            fnRead();
        }

        //CRUD
        $scope.createItem = (x) => {
            (FN.fnConfirm()) ? DB.create('meta', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        $scope.profileItem = async (x, idx) => {
            if (!x.descricao) {
                DB.profile('meta', x._id).then((resp) => {
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

        async function loadingChart(x) {
            const random = require('../../utils/randomizer')
            var acaoFull = random(10, 100);
            var acaoDone = random(1, acaoFull);
            // var filter = { "_meta": x._id, "situacao": Enums.situacao.CONCLUIDA };
            // await DB.readFilter('acao/filter', filter).then((resp) => {
            //     acaoFull = resp.data.length;
            //     acaoDone = resp.data.filter((e) => {
            //         if (e.situacao == Enums.situacao.CONCLUIDA)
            //             return;
            //     });
            // });
            doughnutChart(acaoDone, acaoFull, 'meta_chart' + x.codigo);
        }

        $scope.deleteItem = (x) => {
            (FN.fnConfirm()) ? DB.delete('meta', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        $scope.editItem = (x) => { $scope.x = x; }
        $scope.updateItem = (x) => {
            // delete x.strategyList;
            // delete x.isFav;
            (FN.fnConfirm()) ? DB.update('meta', x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message, $state) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário', $state)
        }

        async function fnRead() {
            await DB.read('meta').then((resp) => {
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

        //OTHERS
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