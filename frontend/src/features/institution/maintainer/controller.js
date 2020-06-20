
const DB = require('../../../services/api.service.axios');
const filesize = require('file-size');

controller.$inject = ['$injector', '$scope', '$state'];
export default function controller($injector, $scope, $state) {

    (async function () {

        // * EXPORTS
        var FN = await require('../../../utils/alerts');
        $scope.situacaoEnum = require('../../../utils/enumerations/SituacaoEnum')()
        $scope.statusEnum = require('../../../utils/enumerations/StatusEnum')()

        // * CONSTANTS AND VARIABLES
        $scope.itemList = [];
        $scope.metaList = [];
        $scope.estrategiaList = [];

        $scope.item = null;
        $scope.x = {}
        $scope.meta = {}
        $scope.estrategia = {}

        $scope.isLoading = false;
        $scope.isProfile = false;

        // * FUNCTIONS
        $scope.profileItem = profileItem;
        $scope.profileAcao = profileAcao;
        $scope.profileEvidencia = profileEvidencia;
        $scope.editItem = editItem;
        $scope.createItem = createItem;
        $scope.createEvidencia = createEvidencia;
        $scope.createFav = fnCreateFav;
        $scope.updateItem = updateItem;
        $scope.deleteItem = deleteItem;
        $scope.deleteFav = fnDeleteFav;
        $scope.filesize = fnFilesize;
        $scope.openFile = fnOpenFile;
        $scope.setImgThumbs = fnSetImgThumbs;
        $scope.verifyStateName = fnVerifyStateName;

        window.onload = fnRead();

        $scope.loadInsertDataModal = ()=>{
            console.log("aki")
        }

        // * FILESIZE
        function fnFilesize(item) {
            return filesize(item).human('jedec');
        }

        //* FAV_INSERT
        //TODO: guardar no DB o "state name" e "params" da página
        function fnCreateFav(x) {
            var item = { fk_goal: x }
            DB.create('favorite', item).then((resp) => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página inserida nos favoritos") });
            fnRead();
        }

        //* FAV_REMOVE
        function fnDeleteFav(x) {
            DB.delete('favorite', x).then(() => { if (fnSuccess(resp)) FN.fnAlertBottom('success', "Página removida dos favoritos") });
            fnRead();
        }

        // * READ FILE
        function fnOpenFile() {
            var input = document.getElementById('file');

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
        function createItem(modelName, x) {
            (FN.fnConfirm()) ? DB.create(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* CREATE EVIDENCIA
        function createEvidencia() {
            var formEvidencia = document.getElementById('form-evidencia-modal');
            var formData = new FormData(formEvidencia);

            (FN.fnConfirm()) ? DB.create('evidencia', formData).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message)
                    : readEvidenciaFilter({ '_acao': $scope.item._id });
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* PROFILE
        function profileItem(modelName, x, idx) {
            if (!x.descricao) {
                DB.profile(modelName, x._id).then((resp) => {
                    if (fnSuccess(resp)) {
                        FN.fnAlertBottom('failure', resp.data.message)
                    }
                    else {
                        if (modelName == "acao") {
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
        function deleteItem(modelName, x) {
            (FN.fnConfirm()) ? DB.delete(modelName, x).then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message)
                } else
                    if (modelName == 'acao')
                        $state.go('acao');
                if (modelName == 'evidencia')
                    readEvidenciaFilter({ '_acao': $scope.item._id });
                else
                    fnRead();
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* UPDATE
        function editItem(x) { $scope.x = x; }

        function updateItem(modelName, x) {
            (FN.fnConfirm()) ? DB.update(modelName, x).then((resp) => {
                (fnSuccess(resp)) ? FN.fnAlertBottom('failure', resp.data.message) : fnRead()
            }) : FN.fnAlertBottom('warning', 'Cancelado pelo usuário')
        }

        //* READ
        async function fnRead() {
            try {
                $scope.isLoadingItem = true;

                if (fnVerifyStateName("acao")) {
                    $scope.isProfile = false;
                    $scope.metaList = readMeta();
                    $scope.itemList = await readItem();
                }

                if (fnVerifyStateName("acaoProfile")) {
                    $scope.isProfile = true;
                    var filter = { "codigo": $state.params.metaCod };
                    var metaArr = await readMetaFilter(filter);
                    $scope.meta = metaArr[0];

                    filter = { "_meta": metaArr[0]._id, "codigo": $state.params.estrategiaCod };
                    var estrArr = await readEstrategiaFilter(filter);
                    $scope.estrategia = estrArr[0];

                    filter = { "_estrategia": estrArr[0]._id, "codigo": $state.params.acaoCod };
                    var acaoArr = await readAcaoFilter(filter);
                    $scope.item = acaoArr[0];
                    $scope.evidenciaList = acaoArr[0]._evidencia;
                }
            }
            finally {
                setTimeout(function () {
                    $scope.isLoadingItem = false;
                    $scope.$digest();
                }, 500);
            }
        }

        /**
         * @returns Retorna um array de metas
         */
        function readMeta() {
            return DB.read('meta').then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de metas filtradas
         */
        function readMetaFilter(filter) {
            return DB.readFilter('meta/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de estrategias filtradas
         */
        function readEstrategiaFilter(filter) {
            return DB.readFilter('estrategia/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @param {Object} filter Objeto JSON usado para filtrar a busca
         * @returns Retorna um array de acoes filtradas
         */
        function readAcaoFilter(filter) {
            return DB.readFilter('acao/filter', filter).then((resp) => { return resp.data; });
        }

        /**
         * @returns Retorna um array de acoes
         */
        function readItem() {
            return DB.read('acao').then((resp) => {
                if (fnSuccess(resp)) {
                    FN.fnAlertBottom('failure', resp.data.message);
                } else {
                    return resp.data;
                }
            })
        }

        /**
         * @returns Retorna um array de evidencias filtradas
         */
        async function readEvidenciaFilter(filter) {
            $scope.isLoadingItem = true;
            // var filter = { '_acao': $scope.item._id }
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

        //*PROFILE ACAO
        function profileAcao(x, idx) {
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
        function profileEvidencia(x, idx) {
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

        /**
         * @description Insere uma imagem na pagina
         * @param {String} item identificador do seletor (class, id, name, etc)
         */
        function fnSetImgThumbs(item) {
            if (item.tipo != 'URL') {
                const selector = "#img-thumb-" + item._id;
                const elem = document.querySelector(selector);
                elem.style.backgroundImage = `url(${item.url})`;
            }
        }

        /**
         * @description Verifica se o state inserido é o state atual
         * @param {String} stateName Nome do estado a ser verificado
         * @returns Retorna true ou false
         */
        function fnVerifyStateName(stateName) {
            return ($state.current.name == stateName) ? true : false;
        }

        //* OTHERS

        /**
         * @description Verifica se a resposta é sucesso ou falha
         * @param {Object} resposta Resposta do servidor (formato= resp.data.success: boolean)
         * @returns Retorna true ou false
         */
        function fnSuccess(resposta) {
            return (resposta.data.success == false) ? true : false;
        }

    })()
}