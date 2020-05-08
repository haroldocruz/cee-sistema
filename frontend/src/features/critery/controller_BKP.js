
const DB = require('../../services/api.service.axios');
const filesize = require('file-size');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {
        var FN = await require('../../utils/alerts');
        $scope.situacaoEnum = require('../../utils/enumerations/SituacaoEnum')()
        $scope.statusEnum = require('../../utils/enumerations/StatusEnum')()

        $scope.itemList = [];
        $scope.metaList = [];
        $scope.estrategiaList = [];
        $scope.item = null;
        $scope.x = {}

        $scope.meta = {}
        $scope.estrategia = {}

        $scope.isLoading = false;
        $scope.isProfile = false;

        window.onload = fnRead();

        $scope.filesize = (item) => {
            return filesize(item).human();
        }

        //* FAV_INSERT
        //TODO: guardar no DB o "state name" e "params" da página
        $scope.createFav = (x) => {
            var item = { fk_goal: x }
            DB.create('favorite', item).then((resp) => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página inserida nos favoritos") });
            fnRead();
        }

        //* FAV_REMOVE
        $scope.removeFav = (x) => {
            DB.delete('favorite', x).then(() => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página removida dos favoritos") });
            fnRead();
        }

        $scope.openFile = function () {
            var input = document.getElementById('file');

            // var reader = new FileReader();
            // reader.onload = function(){
            //   var dataURL = reader.result;
            //   var output = document.getElementById('output');
            //   output.src = dataURL;
            // };
            // console.log(input.files[0])
            // reader.readAsDataURL(input.files[0]);

            // var input = event.target;

            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                var output = document.getElementById('output');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
            console.log(input.files[0])
        };

        //* CREATE
        $scope.createItem = async (modelName, x) => {

            const file = document.getElementById('file').files[0];
            const formEv = document.getElementById('form-evidencia-modal');
            const form = new FormData(formEv);
            // Object.assign(x, form.values()[0])
            // form.append('file', file, file.name)
            // x.file = await document.getElementById('file').files[0];

            (FN.fnConfirm()) ? DB.create(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* CREATE EVIDENCIA
        $scope.createEvidencia = async () => {

            var formEvidencia = document.getElementById('form-evidencia-modal');
            var formData = new FormData(formEvidencia);

            (FN.fnConfirm()) ? DB.create('evidencia', formData).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) 
                // : undefined;
                : readEvidenciaFilter();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* PROFILE
        $scope.profileItem = (modelName, x, idx) => {
            if (!x.descricao) {
                DB.profile(modelName, x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message)
                    }
                    else {
                        if (modelName == "acao"){
                            $scope.itemList[idx] = resp.data;
                            $scope.evidenciaList = resp.data._evidencia;
                        }
                        if (modelName == "evidencia")
                            $scope.evidenciaList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        //* DELETE
        $scope.deleteItem = (modelName, x) => {
            (FN.fnConfirm()) ? DB.delete(modelName, x).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message)
                } else
                    if (modelName == 'acao')
                        $state.go('acao');
                    if (modelName == 'evidencia')
                        readEvidenciaFilter();
                    else
                        fnRead();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* UPDATE
        $scope.editItem = (x) => { $scope.x = x; }
        $scope.updateItem = (modelName, x) => {
            (FN.fnConfirm()) ? DB.update(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* READ
        async function fnRead() {
            try {
                if (verifyStateName("acao"))
                    readItem();
                if (verifyStateName("acaoProfile"))
                    readItemFilter();
                readMeta();
                // readEstrategia();
            }
            finally {
                setTimeout(function () {
                    $scope.isLoadingItem = false
                    $scope.$digest();
                }, 500);
            }
        }

        async function readMeta() {
            await DB.read('meta').then((resp) => {
                $scope.metaList = resp.data;
            });
        }

        $scope.readEstrategia = async (meta) => {
            var estr = { "_meta": meta }
            await DB.readFilter('estrategia/filter', estr).then((resp) => {
                $scope.estrategiaList = resp.data;
                $scope.$digest();
                // console.log(resp.data)
            });
        }

        async function readItem() {
            $scope.isLoadingItem = true;
            $scope.isProfile = false;
            await DB.read('acao').then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message);
                } else {
                    // $scope.$emit('viewContentLoaded')
                    // FN.fnAlertBottom('success', resp.statusText);
                    $scope.itemList = resp.data;
                }
            }).finally(() => {
                $scope.isLoadingItem = false;
                $scope.$digest();
            })
        }

        async function readEvidenciaFilter() {
            $scope.isLoadingItem = true;
            var filter = {'_acao': $scope.item._id}
            await DB.readFilter('evidencia/filter', filter).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message);
                } else {
                    // $scope.$emit('viewContentLoaded')
                    FN.fnAlertBottom('success', resp.statusText);
                    $scope.evidenciaList = resp.data;
                }
            }).finally(() => {
                $scope.isLoadingItem = false;
                $scope.$digest();
            })
        }

        async function readItemFilter() {
            $scope.isLoadingItem = true;
            $scope.isProfile = true;
            var meta = { "codigo": $state.params.metaCod };
            // var estr = $state.params.estrategiaCod;
            // console.log($state.params) //!apagar

            await DB.readFilter('meta/filter', meta).then((resp) => {
                $scope.meta = resp.data[0];
                var filter = {
                    "codigo": $state.params.estrategiaCod,
                    "_meta": $scope.meta._id
                }

                DB.readFilter('estrategia/filter', filter).then((resp) => {
                    $scope.estrategia = resp.data[0];
                    var filter = {
                        "codigo": $state.params.acaoCod,
                        "_estrategia": $scope.estrategia._id
                    }

                    DB.readFilter('acao/filter', filter).then((resp) => {

                        if (fnSuccess(resp)) {
                            FN.fnAlertBottom('failure', resp.data.message, $state);
                        } else {
                            if (resp.data.length === 0) {
                                FN.fnAlertBottom('failure', "Nenhum dado encontrado para esta busca", $state);
                            } else {
                                // FN.fnAlertBottom('success', resp.statusText, $state);
                                $scope.item = resp.data[0];
                                $scope.evidenciaList = resp.data[0]._evidencia;
                                // console.log(resp.data)
                                $scope.$digest();
                            }
                        }
                    })
                })
            })
            $scope.isLoadingItem = false;
            $scope.$digest();
        }

        //*PROFILE ACAO
        $scope.profileAcao = async (x, idx) => {
            if (!x.descricao) {
                DB.profile('acao', x._id).then((resp) => {
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

        //*PROFILE EVIDENCIA
        $scope.profileEvidencia = async (x, idx) => {
            if (!x.descricao) {
                DB.profile('evidencia', x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message, $state)
                    }
                    else {
                        $scope.evidenciaList[idx] = resp.data;
                        $scope.$digest();
                    }
                })
            }
        }

        $scope.setImgThumbs = setImgThumbs;
        function setImgThumbs (item) {
            if (item.tipo != 'URL') {
                const selector = "#img-thumb-" + item._id;
                const elem = document.querySelector(selector);
                elem.style.backgroundImage = `url(${item.url})`;
            }
        }

        $scope.verifyStateName = verifyStateName;
        function verifyStateName(stateName) {
            return ($state.current.name == stateName) ? true : false;
        }

        //OTHERS

        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

        //*CHART CONFIG
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
            $scope.doughnutChart(acaoDone, acaoFull, 'id_chart' + x._id);
        }

    })()
}