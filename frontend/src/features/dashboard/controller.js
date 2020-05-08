

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {
        const DB = require('../../services/api.service.axios');
        const statusEnum = require('../../utils/enumerations/StatusEnum')()

        $scope.counter = { goal:{ total: null, done: null}, strategy:{ total: null, done: null}, action:{ total: null, done: null} };
        $scope.favoriteList = [];
        $scope.fav = { goalList: [], strategyList: [], actionList: [] };

        // window.onload = ()=>{ favorite(); initialize()}
        // window.onload = () => { favorite(); }
        // window.onload = favorite();

        $scope.removeFav = (id) => { DB.delete('favorite', id).then(() => { favorite() }) }

        await DB.readFilter('meta/counter', {}).then((resp) => { $scope.counter.goal.total = resp.data; $scope.$digest(); });
        // await DB.readFilter('meta/counter', {'status': statusEnum.VALIDADO}).then((resp) => { $scope.counter.meta.done = resp.data; $scope.$digest(); })
        
        await DB.readFilter('estrategia/counter', {}).then((resp) => { $scope.counter.strategy.total = resp.data; $scope.$digest(); });
        // await DB.readFilter('estrategia/counter', {'status': statusEnum.VALIDADO}).then((resp) => { $scope.counter.estrategia.done = resp.data; $scope.$digest(); })
        
        await DB.readFilter('acao/counter', {}).then((resp) => { $scope.counter.action.total = resp.data; $scope.$digest(); })
        await DB.readFilter('acao/counter', {'status': statusEnum.VALIDADO}).then((resp) => { $scope.counter.action.done = resp.data; $scope.$digest(); })

        $scope.percentTotal = percentual($scope.counter.action.done, $scope.counter.action.total, 1); //?implementar
        // $scope.percentTotal = percentual($scope.counter.action.done, $scope.counter.action.total, 1);
        $scope.$digest();

        chart($scope.counter.goal.total, $scope.counter.strategy.total, $scope.counter.action.total);
        doughnutChart(1, $scope.counter.goal.total, 'meta_chart');
        doughnutChart(1, $scope.counter.strategy.total, 'estrategia_chart');
        doughnutChart(1, $scope.counter.action.total, 'acao_chart');
        // doughnutChart($scope.counter.goal.partial, $scope.counter.goal.total, 'meta_chart');
        // doughnutChart($scope.counter.strategy.partial, $scope.counter.strategy.total, 'estrategia_chart');
        // doughnutChart($scope.counter.action.partial, $scope.counter.action.total, 'acao_chart');
        doughnut();


        async function favorite() {
            await DB.read('favorite').then((resp) => {
                var favoriteList = resp.data;
                $scope.fav = { goalList: [], strategyList: [], actionList: [] };
                favoriteList.forEach(e => {
                    if (e.fk_goal) $scope.fav.goalList.push(e);
                    if (e.fk_strategy) $scope.fav.strategyList.push(e);
                    if (e.fk_action) $scope.fav.actionList.push(e);
                });
                $scope.$digest();
            });
        }

        function chart(metaCounter, estrategiaCounter, acaoCounter) {

            var ctx = document.getElementById('myChart').getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Concluídas', 'Em andamento', 'Em estudo'],
                    datasets: [{
                        label: 'Ações',
                        data: [metaCounter, estrategiaCounter, acaoCounter],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }

        function doughnut() {

            const documentStats = document.getElementById('document_stats').getContext('2d');

            // const statsArr = {
            //     commentary: 0,
            //     variants: 0
            // };

            const chartData = {
                labels: ['Ações Concluídas', 'Ações à concluir'],
                datasets: [{
                    data: [2, 3],
                    borderWidth: 1,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                    // hoverBackgroundColor: ['#148fb5', '#f2d02b'],
                }],
            };

            // chartData.labels = Object.keys(statsArr);
            // for charts data
            // chartData.datasets[0].data = Object.values(statsArr);

            // And for a doughnut chart
            new Chart(documentStats, {
                type: 'doughnut',
                data: chartData,
                maintainAspectRatio: false,
                responsive: true,
                options: {
                    legend: {
                        display: true,
                        position: 'left'
                    },
                },
            });
        }

        function doug() {
            const ctx = document.getElementById('document_stats2').getContext('2d');

            var data = {
                datasets: [{
                    data: [10, 20, 30],
                    borderWidth: 5,
                    backgroundColor: ['#009900', '#000099', '#dddd00'],
                    hoverBackgroundColor: ['#1b1', '#11b', '#ec1'],
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Concluído ' + (10 * 100 / 60).toFixed(2) + '%',
                    'Em andamento ' + (20 * 100 / 60).toFixed(2) + '%',
                    'Em estudo ' + (30 * 100 / 60).toFixed(2) + '%',
                ]
            };

            var options = {
                legend: {
                    display: true,
                    position: 'left'
                },
            }

            new Chart(ctx, {
                type: 'pie',
                data: data,
                options: options
            });
        }

        function doughnutChart(concluido, total, idNameItem) {
            const ctx = document.getElementById(idNameItem).getContext('2d');

            var falta = total - concluido;

            var data = {
                datasets: [{
                    data: [concluido, falta],
                    borderWidth: 0.5,
                    backgroundColor: ['#009900', 'rgba(255, 159, 64, 0.2)']
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    '' + (concluido * 100 / total).toFixed(0) + '%',
                    '' + (falta * 100 / total).toFixed(0) + '%'
                ]
            };

            var options = {
                legend: {
                    display: false,
                    position: 'left'
                },
            }

            new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options
            });
        }
        
        /**
         * @description Calcula o percentual de uma parcial mediante seu montante
         * @param {double} partial parcial de um montante
         * @param {double} total total de um montante
         * @param {int} dec quantidade de casas decimais
         */
        function percentual (partial, total, dec) {
            return (partial * 100 / total).toFixed(dec);
        }
        
    })()
}